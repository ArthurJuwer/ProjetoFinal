const urlParams = new URLSearchParams(window.location.search);
const numero = localStorage.getItem('numero');

fetch('retorno.json')


  .then(response => {

    if (!response.ok) {
      throw new Error('Erro ao carregar o arquivo JSON');
    }

    return response.json();
  })
  .then(dados => {

    const pedido = dados.pedidos[0];



    // card-footer - TEMPO
    // cardButton.setAttribute('href', '') // este codigo vai ser importante para o redirecionamento
    

  })
  .catch(error => {
    console.error("Erro ao ler o arquivo JSON:", error);
  });