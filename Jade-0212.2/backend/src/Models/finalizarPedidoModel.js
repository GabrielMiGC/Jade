const connection = require('./connection');

const insertEndereco = async(body) => {
    const { id_endereco, numero, rua, bairro, cep, complemento, estado,cidade, id_cliente } = body;

    try{
        const query = await connection.execute(
            `INSERT INTO Endereco (id_endereco, numero, rua, bairro, cep, cidade, estado, complemento, id_cliente)
            VALUES ('${id_endereco}', '${numero}', '${rua}', '${bairro}', '${cep}', '${cidade}', '${estado}', '${complemento}', '${id_cliente}')
            ON DUPLICATE KEY UPDATE id_endereco = ${id_endereco} + 1;`)
        return query;
    } catch{
        console.error("Erro no Banco de dados", error);
    };
};

const getEndereco = async(id) => {
    const [ query ] = await connection.execute(
        `SELECT Endereco.id_cliente, Endereco.numero, Endereco.bairro, Endereco.cep, Endereco.complemento, Endereco.cidade, Endereco.estado
        FROM Endereco JOIN Cliente
        ON Endereco.id_cliente = Cliente.id_cliente
        WHERE Endereco.id_cliente = '${id}';`
    );

    return query;
};

const insertCartao = async(body) => {
    const { numero_cartao, nome_titular, data_validade, cvv, id_cliente } = body;

    try{
        const query = await connection.execute(`
            INSERT INTO Cartoes (numero_cartao, nome_titular, data_validade, cvv, id_cliente)
            VALUES ('${numero_cartao}', '${nome_titular}', '${data_validade}', '${cvv}', '${id_cliente}')
            ON DUPLICATE KEY UPDATE id_cartoes = LAST_INSERT_ID(id_cartoes + 1);
        `)
        return query;
    } catch{
        console.error("Errono no banco de dados", error);
    };
};

const getCartao = async(id) => {
    const [ query ] = await connection.execute(
        `SELECT Cartoes.id_cartoes, Cartoes.numero_cartao, Cartoes.nome_titular, Cartoes.data_validade, Cartoes.cvv, Cliente.id_cliente
        FROM Cartoes JOIN Cliente
        ON Cartoes.id_cartoes = Cliente.id_cliente
        WHERE Cartoes.id_cartoes = '${id}';`
    );
    return query;
};
module.exports = {
    insertEndereco,
    getEndereco,
    insertCartao,
    getCartao
}