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
 }

 var resultContainer = document.getElementById('qr-reader-results');
 var lastResult, countResults = 0;


 function onScanSuccess(decodedText, decodedResult) {
     if (decodedText !== lastResult) {
         ++countResults;
         lastResult = decodedText;
         window.location = decodedText
         // Exibe o resultado na página
     }
 }

 function onScanError(errorMessage) {
     console.error(`Erro ao ler o QR Code: ${errorMessage}`);
 }

 var html5QrcodeScanner = new Html5QrcodeScanner(
     "qr-reader", { fps: 10, qrbox: 250 });
 html5QrcodeScanner.render(onScanSuccess, onScanError);