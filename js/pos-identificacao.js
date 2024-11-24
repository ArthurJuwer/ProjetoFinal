// Extração de parâmetros da URL
const urlParams = new URLSearchParams(window.location.search);
const numero = Number(urlParams.get('numero')); // Converte para número
const itemId = Number(urlParams.get('item'));  // Converte para número

// Seleção dos elementos DOM
const cardTitle = document.querySelector(".card-title");
const cardDescription = document.querySelector(".card-description");

// Carregar o JSON
fetch('retorno.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao carregar o arquivo JSON');
    }
    return response.json();
  })
  .then(dados => {
    const pedido = dados.pedidos[0]; // Primeiro pedido no JSON

    // Verifica erros no pedido
    if (pedido.erros == 0) {
      cardTitle.setAttribute('class', 'card-title green');
      cardTitle.innerHTML = '<h4>✅ Item Aprovado</h4>';
    } else {
      cardTitle.setAttribute('class', 'card-title red');
      cardTitle.innerHTML = '<h4>⚠️ Item Não Encontrado</h4>';
    }

    // Verifica se o número do kit corresponde
    if (pedido.kit_cirurgico.id === numero) {
      // Localiza o item específico pelo ID
      const itemEncontrado = pedido.kit_cirurgico.itens.find(item => item.id === itemId);

      if (itemEncontrado) {
        // Atualiza a descrição do cartão com os dados do item encontrado
        cardDescription.innerHTML = `
          <div class="card-description-section1">
            <p><strong>CAIXA IDENTIFICADORA:</strong> ${pedido.kit_cirurgico.id}</p>
            <p><strong>ITEM:</strong> ${itemEncontrado.nome}</p>
            <p><strong>LOCAL:</strong> ${pedido.sala}</p>
          </div>
          <div class="card-description-section2">
            <p><strong>DATA:</strong> ${pedido.data}</p>
            <p><strong>SUPERVISOR:</strong> ${pedido.responsavel.nome}</p>
            <p><strong>LOTE:</strong> ${pedido.kit_cirurgico.lote}</p>
          </div>
        `;
      } else {
        // Caso o item não seja encontrado
        cardTitle.setAttribute('class', 'card-title red');
        cardTitle.innerHTML = '<h4>⚠️ Item Não Encontrado no Kit</h4>';
      }
    } else {
      // Caso o número do kit não corresponda
      cardTitle.setAttribute('class', 'card-title red');
      cardTitle.innerHTML = '<h4>⚠️ Kit Não Encontrado</h4>';
    }
  })
  .catch(error => {
    console.error("Erro ao ler o arquivo JSON:", error);
  });
