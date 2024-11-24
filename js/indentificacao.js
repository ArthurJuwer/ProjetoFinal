const urlParams = new URLSearchParams(window.location.search);
const numeroParam = localStorage.getItem('numero');
const kitArea = document.querySelector(".kit-area input")



fetch('retorno.json')


  .then(response => {

    if (!response.ok) {
      throw new Error('Erro ao carregar o arquivo JSON');
    }

    return response.json();
  })
  .then(dados => {

    const pedido = dados.pedidos[0];

    console.log(pedido.kit_cirurgico.id)

    if(pedido.kit_cirurgico.id == numeroParam){
        
        kitArea.value = 'ID - ' + pedido.kit_cirurgico.id
    }

    // card-footer - TEMPO
    // cardButton.setAttribute('href', '') // este codigo vai ser importante para o redirecionamento
    

  })
  .catch(error => {
    console.error("Erro ao ler o arquivo JSON:", error);
  });

  
