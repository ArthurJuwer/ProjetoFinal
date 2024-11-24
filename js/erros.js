const urlParams = new URLSearchParams(window.location.search);
const numero = localStorage.getItem('numero');

function carregarDados(){

    

    fetch('retorno.json')
  .then(response => {

    if (!response.ok) {
      throw new Error('Erro ao carregar o arquivo JSON');
    }

    return response.json();
  })
  .then(dados => {

    const pedido = dados.pedidos[0];

    if(pedido.kit_cirurgico.id == numero && pedido.erros != 0){

        const containerCards = document.querySelector(".container-card")

        containerCards.innerHTML = `
        <div class="card">
                <div class="card-title">
                    <h4>⚠️ Item Perdido</h4>
                </div>
                <div class="card-description">
                    <p><strong>CAIXA INDENTIFICADORA:</strong> ${pedido.kit_cirurgico.id}</p>
                    <p><strong>ITEM:</strong> ${pedido.kit_cirurgico.itens[0].nome} </p>
                    <p><strong>LOCAL: </strong> ${pedido.sala}</p>
                    <p><strong>SUPERVISOR:</strong> ${pedido.responsavel.nome} </p>
                </div>
                
                <div class="card-footer">
                    <span>🕒 22:06 - 23/11</span>
                    <button class="card-btn" onclick="abrirCandidatura()">Detalhes</button>
                </div>
            </div>
        
        `
    }
    

  })
  .catch(error => {
    console.error("Erro ao ler o arquivo JSON:", error);
  });
}

carregarDados()