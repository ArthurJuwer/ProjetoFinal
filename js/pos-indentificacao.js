const urlParams = new URLSearchParams(window.location.search);

const numero = localStorage.getItem('numero');

const cardTitle = document.querySelector(".card-title")
const cardDescription = document.querySelector(".card-description")
const cardButton = document.querySelector(".card-button")


// Exibir o número extraído (se houver)






fetch('retorno.json')
  .then(response => {

    if (!response.ok) {
      throw new Error('Erro ao carregar o arquivo JSON');
    }

    return response.json();
  })
  .then(dados => {

    const pedido = dados.pedidos[0];

    if(pedido.erros == 0){
        cardTitle.setAttribute('class', 'card-title green')
        cardTitle.innerHTML = '<h4>✅ Item Aprovado</h4>'
    } else {
        cardTitle.setAttribute('class', 'card-title red')
        cardTitle.innerHTML = '<h4>⚠️ Item Nao Encontrado</h4>'
    }

    if(pedido.kit_cirurgico.id == numero){
        cardDescription.innerHTML = `
        <div class="card-description-section1">
        <p><strong>CAIXA IDENTIFICADORA:</strong> ${pedido.kit_cirurgico.id}</p>
        <p><strong>ITEM(S):</strong> ${pedido.kit_cirurgico.itens.map(item => item.nome).join(", ")}</p>
        <p><strong>LOCAL:</strong> ${pedido.sala}</p>
            </div>
            <div class="card-description-section2">
                <p><strong>DATA:</strong> ${pedido.data}</p>
                <p><strong>SUPERVISOR:</strong> ${pedido.responsavel.nome}</p>
                <p><strong>LOTE:</strong> ${pedido.kit_cirurgico.lote}</p>
            </div>  
        `
    }

    // card-footer - TEMPO
    // cardButton.setAttribute('href', '') // este codigo vai ser importante para o redirecionamento
    

  })
  .catch(error => {
    console.error("Erro ao ler o arquivo JSON:", error);
  });

