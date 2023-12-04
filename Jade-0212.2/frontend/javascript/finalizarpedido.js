// FUNÇÕES
function exibirFormulario() {
    document.getElementById("novocard").style.display = "block";
}

const validarEndereco = () =>{
    const numero = document.getElementById('novo-numero-da-casa').value;
    const rua = document.getElementById('nova-rua').value;
    const bairro = document.getElementById('novo-bairro').value;
    const cep = document.getElementById('novo-CEP').value;
    const cidade = document.getElementById('novo-cidade').value;
    const estado = document.getElementById('novo-estado').value;
    const complemento = document.getElementById('novo-complemento').value;

    if(numero.toString().length > 6){
        alert('Numero da casa invalido');
        return {};
    }

    var ruaRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!ruaRegex.test(rua)){
        alert('Caracteres invalidos no nome da rua');
        return {};
    }

    if (!ruaRegex.test(bairro)) {
        alert('Caracteres invalidos no nome de bairro');
        return {};
    }

    var intRegex = /^\d{11}$/;
    if(!intRegex.test(cep)){
        alert('CEP invalido');
        return {};
    }

    if (!ruaRegex.test(cidade)) {
        alert('Caracteres inválidos para cidade');
        return {};
    }

    if (!ruaRegex.test(estado)) {
        alert('Caracteres inválidos para estado');
        return {};
    }

    if (!ruaRegex.test(complemento)) {
        alert('Caracteres inválidos para complemento');
        return {};
    }

    return{
        numero: numero,
        rua: rua,
        bairro: bairro,
        cep: cep,
        cidade: cidade,
        estado: estado,
        complemento: complemento
    };
};

 const adicionarNovoEndereco = async(cliente, numero, rua, bairro, cep, cidade, estado, complemento) => {
    const form = document.getElementById("novo-endereco");
    const formData = { id_endereco: cliente, numero: numero, rua: rua, bairro: bairro, cep: cep, cidade: cidade, estado: estado, complemento: complemento, id_cliente: cliente }

    fetch('http://localhost:3000/finalizarPedidoie', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.mensagem);
    })
    .catch(error => console.error('Erro ao enviar dados ao servidor', error));
};

var formcard = document.getElementById("novoCartaoForm");
// formcard = formcard
const validarCard = () => {
    const nome_titular =  document.getElementById('nomeTitular').value;
    const numero_cartao = document.getElementById('numeroCartao').value;
    const data_validade = document.getElementById('vencimentoCartao').value;
    const cvv = document.getElementById('cvv').value;

    var nomeRegex = /^[\w\s]+$/;
    if(!nomeRegex.test(nome_titular)){
        alert('Nome invalido');
        return {};
    }

    var intRegex = /^\d{16}$/;
    if (!intRegex.test(numero_cartao)) {
        alert('Numero de cartão invalido');
        return {};
    }

    if (cvv.toString().length > 3) {
        alert('CVV inválido');
        return {};
    }

    return{
        numero_cartao: numero_cartao,
        nome_titular: nome_titular,
        data_validade: data_validade,
        cvv: cvv
    }
}
console.log(formcard);
const adicionarNovoCartao = async(formcard) => {
    
    const formData = { id_cartoes: id_cartoes, numero_cartao: numero_cartao, nome_titular: nome_titular, data_validade: data_validade, cvv: cvv, cliente: id_cliente }
    console.log('cartao ok');
    fetch('http://localhost:3000/finalizarPedidoic', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.mensagem);
    })
    .catch(error => console.error('Erro ao enviar dados ao servidor', error));
};

const getEndereco = async(cliente, numero, rua, bairro, cep, cidade, estado, complemento) => {
    const endr = { id_endereco: cliente, numero: numero, rua: rua, bairro: bairro, cep: cep, cidade: cidade, estado: estado, complemento: complemento, id_cliente: cliente }
    let idendereco = 0;

    await fetch('http://localhost:3000/finalizarPedidoge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(endr)
    })
    .then(response => response.json())
    .then(data => {
        idendereco = data.id_endereco;
    })
    .catch(error => {
        console.error('Erro ao enviar dados para o servidor', error);
    });

    return idendereco;
}

const getCartao = async(cliente, numero_cartao, nome_titular, data_validade, cvv) => {
    const card = { id_cartoes: cliente, numero_cartao: numero_cartao, nome_titular: nome_titular, data_validade: data_validade, cvv: cvv, id_cliente: cliente }
    let idcartoes = 0;

    await fetch('http://localhost:3000/finalizarPedidogc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(card)
    })
    .then(response => response.json())
    .then(data => {
        idcartoes = data.id_cartoes;
    })
    .catch(error => {
        console.error('Erro ao enviar dados para o servidor', error);
    });

    return idcartoes;
}
//EVENTOS
const buttonaddCar = document.getElementById('addCard');
const buttonaddendereco = document.querySelector('.btn-link');

buttonaddendereco.addEventListener('submit', async(e) =>{
    e.preventDefault();
    const endereco = validarEndereco();
    console.log(endereco);
    if (Object.keys(endereco).length !== 0){
        await adicionarNovoEndereco(endereco);
    }
});

buttonaddCar.addEventListener('submit', async(e) => {
    e.preventDefault();
    const cartao = validarCard();
    console.log(cartao);
    if (Object.keys(cartao).length !==0) {
        await adicionarNovoCartao(cartao);
        console.log("cartao adicionado");
    }
});

// const btnFinalizar = document.querySelector('.btn-primary');
// btnFinalizar.addEventListener('click', async() =>{
//     alert('Compra finalizada')
// })