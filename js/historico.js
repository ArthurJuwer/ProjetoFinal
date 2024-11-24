const urlParams = new URLSearchParams(window.location.search);

fetch('retorno.json')


  .then(response => {

    if (!response.ok) {
      throw new Error('Erro ao carregar o arquivo JSON');
    }

    return response.json();
  })
  .then(dados => {

    const pedido = dados.pedidos[0];

    const tabelaDados = document.querySelector(".custom-table tbody")

    tabelaDados.innerHTML = `
    
         <tr>
            <td>${pedido.sala}</td>
            <td>${pedido.hora}</td>
            <td>${pedido.data}</td>
            <td>${pedido.kit_cirurgico.validade}</td>
            <td>${pedido.kit_cirurgico.id} - ${pedido.kit_cirurgico.tipo}</td>
            <td>${pedido.kit_cirurgico.estado}</td>
            <td>${pedido.kit_cirurgico.observacao}</td>
            <td>${pedido.responsavel.numero_funcionario} - ${pedido.responsavel.nome}</td>
        </tr>
    `

    // card-footer - TEMPO
    // cardButton.setAttribute('href', '') // este codigo vai ser importante para o redirecionamento
    

  })
  .catch(error => {
    console.error("Erro ao ler o arquivo JSON:", error);
  });