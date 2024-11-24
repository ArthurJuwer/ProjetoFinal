// Carrega parâmetro da URL
const urlParams = new URLSearchParams(window.location.search);
const numero = urlParams.get('numero');

if (numero) localStorage.setItem('numero', numero);

// Carrega dados JSON
function carregarDados() {
    const numeroParam = localStorage.getItem('numero');
    if (!numeroParam) return;

    fetch('retorno.json')
        .then(response => response.json())
        .then(dados => {
            const pedido = dados.pedidos.find(p => p.kit_cirurgico.id == numeroParam);
            if (pedido) {
                document.querySelector(".container-cards").innerHTML = `
                    <div class="card"><h3>Rastreio</h3><p>${pedido.kit_cirurgico.id}</p></div>
                    <div class="card"><h3>Itens</h3><p>${pedido.kit_cirurgico.itens.length}</p></div>
                    <div class="card"><h3>Erros</h3><p>${pedido.erros}</p></div>
                    <div class="card"><h3>Histórico</h3><p>${pedido.data}</p></div>
                `;
            }
        });
}

// Abre o modal
function abrirCandidatura() {
    document.querySelector('#dialog').classList.remove('hidden');
}

// Fecha o modal
function fecharCandidatura() {
    document.querySelector('#dialog').classList.add('hidden');
    stopCamera();
}

// Abre a câmera e escaneia QR Codes
async function abrirCamera() {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        video.srcObject = stream;

        const scanQRCode = () => {
            if (video.readyState === video.HAVE_ENOUGH_DATA) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);

                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

                if (qrCode) {
                    localStorage.setItem('numero', qrCode.data);
                    carregarDados();
                    fecharCandidatura();
                }
            }
            requestAnimationFrame(scanQRCode);
        };

        scanQRCode();
    } catch (error) {
        console.error('Erro ao acessar câmera:', error);
    }
}

// Para a câmera
function stopCamera() {
    const video = document.getElementById('video');
    if (video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
        video.srcObject = null;
    }
}

carregarDados();
