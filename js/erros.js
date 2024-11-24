const urlParams = new URLSearchParams(window.location.search);
const numero = localStorage.getItem('numero');

let mostrar = false

function fecharCandidatura() {
  const dialog = document.querySelector('#dialog');
  dialog.classList.add('hidden');
  mostrar = false
}
function abrirCandidatura() {
  dialog.classList.remove('hidden');
}

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
        
          console.log("entrou")
          const dialog = document.querySelector('#dialog');
          dialog.innerHTML = `
           
          <div class="dialog">
                    <button class="close-dialog" onclick="fecharCandidatura()">×</button>
                    <h3>Detalhes do Item Perdido</h3>
                    <p><strong>Caixa Identificadora:</strong> ${pedido.kit_cirurgico.id}</p>
                    <p><strong>Item:</strong> ${pedido.kit_cirurgico.itens[0].nome}</p>
                    <p><strong>Local:</strong> ${pedido.sala}</p>
                    <p><strong>Supervisor:</strong> ${pedido.responsavel.nome}</p>
                    <p><strong>Data:</strong> ${pedido.hora} - ${pedido.data}</p>e
                    <p><strong>Candidato: </strong></p>
                    <select name="" id="">
                        <option value="${pedido.funcionarios_disponiveis[0].nome}">${pedido.funcionarios_disponiveis[0].nome} - ${pedido.funcionarios_disponiveis[0].profissao}</option>
                        <option value="${pedido.funcionarios_disponiveis[1].nome}">${pedido.funcionarios_disponiveis[1].nome} - ${pedido.funcionarios_disponiveis[1].profissao}</option>
                    </select>
                    <button onclick="fecharCandidatura()">Concluir</button>
                </div>
          `
          dialog.classList.add('hidden');
          
        
    }
    

  })
  .catch(error => {
    console.error("Erro ao ler o arquivo JSON:", error);
  });
}

carregarDados()