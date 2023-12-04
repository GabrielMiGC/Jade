const finalizarPedidoModel = require('../Models/finalizarPedidoModel');

const insertEndereco = async (request, response) => {
    await finalizarPedidoModel.insertEndereco(request.body);

    return response.status(201).json({mensagem: 'endereco cadastrado'});
};

const getEndereco = async (request, response) => {
    const { id } = request.body;

    const query = await finalizarPedidoModel.getEndereco(id);

    return response.status(200).json(query);
};

const insertCartao = async (request, response) => {
    await finalizarPedidoModel.insertCartao(request.body);

    return response.status(201).json({mensagem: 'cartao cadastrado'});
};

const getCartao = async (request, response) => {
    const { id } = request.body;

    const query = await finalizarPedidoModel.getCartao(id);

    return response.status(200).json(query);
};

module.exports = {
    getCartao,
    insertCartao,
    getEndereco,
    insertEndereco
}