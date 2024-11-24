 // Captura o parâmetro da URL e salva no localStorage
 const urlParams = new URLSearchParams(window.location.search);
 const numero = urlParams.get('numero');

 if (numero) {
     localStorage.setItem('numero', numero); // Salva o parâmetro no localStorage
 }

 // Função para carregar dados do JSON e exibir no painel
 function carregarDados() {
     const numeroParam = localStorage.getItem('numero'); // Obtém o parâmetro salvo

     if (!numeroParam) {
         console.error('Nenhum número encontrado no localStorage.');
         return;
     }

     fetch('retorno.json')
         .then(response => {
             if (!response.ok) {
                 throw new Error('Erro ao carregar o arquivo JSON');
             }
             return response.json();
         })
         .then(dados => {
             const pedido = dados.pedidos.find(p => p.kit_cirurgico.id == numeroParam); // Encontra o pedido correto

             if (pedido) {
                 const containerCards = document.querySelector(".container-cards");
                 containerCards.innerHTML = `
                     <div class="card">
                         <h3>Caixa sendo rastreada atualmente</h3>
                         <p>${pedido.kit_cirurgico.id}</p>
                     </div>
                     <div class="card">
                         <h3>Itens presentes</h3>
                         <p>${pedido.kit_cirurgico.itens.length}</p>
                     </div>
                     <div class="card">
                         <h3>Erros Pendentes</h3>
                         <p>${pedido.erros} erro(s)</p>
                     </div>
                     <div class="card">
                         <h3>Histórico de Ações</h3>
                         <p>Último rastreamento: ${pedido.data}</p>
                     </div>
                 `;
             } else {
                 console.error('Pedido não encontrado.');
             }
         })
         .catch(error => {
             console.error("Erro ao ler o arquivo JSON:", error);
         });
 }

 // Chamando a função para carregar os dados
 carregarDados();

 // Função para abrir o modal de escaneamento
 function abrirCandidatura() {
     const dialog = document.querySelector('#dialog');
     dialog.classList.remove('hidden');
 }

 // Função para fechar o modal
 function fecharCandidatura() {
     const dialog = document.querySelector('#dialog');
     dialog.classList.add('hidden');
     stopCamera(); // Para a câmera se estiver ativa
 }

 // Função para abrir a câmera e escanear QR Codes
 async function abrirCamera() {
     const video = document.getElementById('video');
     const canvas = document.getElementById('canvas');
     const context = canvas.getContext('2d');
     const output = document.getElementById('output');

     try {
         // Acessa a câmera do dispositivo
         const stream = await navigator.mediaDevices.getUserMedia({
             video: { facingMode: 'environment' }
         });
         video.srcObject = stream;

         // Função para capturar frames do vídeo e escanear QR Codes
         const scanQRCode = () => {
             if (video.readyState === video.HAVE_ENOUGH_DATA) {
                 canvas.width = video.videoWidth;
                 canvas.height = video.videoHeight;
                 context.drawImage(video, 0, 0, canvas.width, canvas.height);

                 const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                 const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

                 if (qrCode) {
                     output.textContent = `QR Code detectado: ${qrCode.data}`;
                     console.log('QR Code detectado:', qrCode.data);

                     // Salva o QR Code no localStorage
                     localStorage.setItem('numero', qrCode.data);
                     carregarDados(); // Atualiza os dados
                     fecharCandidatura(); // Fecha a janela de diálogo
                 } else {
                     output.textContent = 'Nenhum QR Code detectado.';
                 }
             }
             requestAnimationFrame(scanQRCode); // Continua o loop
         };

         scanQRCode();
     } catch (error) {
         console.error('Erro ao acessar a câmera:', error);
         output.textContent = 'Erro ao acessar a câmera.';
     }
 }

 // Função para parar a câmera
 function stopCamera() {
     const video = document.getElementById('video');
     const stream = video.srcObject;
     if (stream) {
         const tracks = stream.getTracks();
         tracks.forEach(track => track.stop());
         video.srcObject = null;
     }
 }
