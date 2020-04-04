const projetosModel = require('../Model/tekProjetos_Model.js')
const tempo = require('./utils/tempo_Controller.js')
const strcontroller = require('./utils/string_Controller.js')



const incluirProjeto = async(dadosReq) => {

    let inicio = tempo.brToen(dadosReq.editInicio)
    let fim
    let resultado
    let SQL
    let msgRetorno = {
        'incluido': null,
        'msg': ''
    }

    if (dadosReq.editFim != '') {
        fim = tempo.brToen(dadosReq.editFim)
    } else {
        fim = null
    }

    let codigoProjeto = parseInt(dadosReq.editCodigo_Projeto)


    Object.keys(dadosReq).forEach((key) => {
        dadosReq[key] = strcontroller.removerAcentos(dadosReq[key])
        if (dadosReq[key].length == 0) {
            if (key != 'editFim') {
                msgRetorno.incluido = false
                msgRetorno.msg = `Exite campo obrigatorio vazio: ${key}`
                msgRetorno.log = `Campo ${key} é obrigatório`

            }
        }
    })

    if (msgRetorno.incluido == null) {
        let conteudo
        if (fim == null) {
            SQL = ` INSERT INTO PROJETOS (codigo_projeto, empresa, descricao, descricao_completa, inicio,  gerente, responsavel)
                        VALUES (${codigoProjeto},upper('${dadosReq.editEmpresa}'), upper('${dadosReq.editDescricao}'), upper('${dadosReq.editDescricao_Completa}'), '${inicio}',  upper('${dadosReq.editGerente}'), upper('${dadosReq.editResponsavel}'))`
        } else {
            SQL = ` INSERT INTO PROJETOS (codigo_projeto, empresa, descricao, descricao_completa, inicio, fim, gerente, responsavel)
                        VALUES (${codigoProjeto},upper('${dadosReq.editEmpresa}'), upper('${dadosReq.editDescricao}'), upper('${dadosReq.editDescricao_Completa}'), '${inicio}', '${fim}', upper('${dadosReq.editGerente}'), upper('${dadosReq.editResponsavel}'))`

        }

        console.log(SQL)
        let gravar = projetosModel.incluir(SQL)

        resultado = await gravar.then((dados) => {
            return dados;

        });

        SQL = undefined

    } else {

        resultado = false
    }

    if (resultado == false) {
        msgRetorno.incluido = false
        msgRetorno.msg = `Registro não foi incluido.`
        return msgRetorno

    } else {
        msgRetorno.incluido = true
        msgRetorno.msg = `Registro incluido com sucesso.`
        return msgRetorno

    }



}

const localizarProjeto = async(dadosReq) => {
    let SQL = undefined
    if (dadosReq / 1) {
        SQL = `SELECT id, codigo_projeto, empresa, descricao, descricao_completa, inicio, fim, gerente, responsavel
         FROM PROJETOS WHERE CODIGO_PROJETO = ${dadosReq}`
    } else {

        let upPalavra = dadosReq.toUpperCase().trim()
        if (dadosReq.length < 1) {
            SQL = `SELECT id,codigo_projeto, empresa, descricao, descricao_completa, inicio , fim, gerente, responsavel
           FROM PROJETOS  ORDER BY CODIGO_PROJETO`
        } else {
            console.log('upPalavra', upPalavra)
            SQL = `SELECT id,codigo_projeto, empresa, descricao, descricao_completa, inicio, fim, gerente, responsavel 
                FROM PROJETOS WHERE upper(EMPRESA) LIKE '${upPalavra}%' ORDER BY CODIGO_PROJETO`
        }
    }
    let buscar = projetosModel.localizar(SQL)
    let resultado
    resultado = await buscar.then((dados) => {
        return dados;

    });
    SQL = undefined

    return resultado
}



const excluir = async(id) => {
    let SQL = undefined
    let resultado

    SQL = `DELETE FROM PROJETOS WHERE ID = ${id}`
    try {
        let buscar = projetosModel.localizar(SQL)

        resultado = await buscar.then((dados) => {
            return dados;
        });
    } catch (error) {

        console.log('Erro ao excluir: ', error)

    }

    SQL = undefined

    return resultado
}

const alterarirProjeto = async(dadosReq) => {

    let inicio = tempo.brToen(dadosReq.editarInicio)
    let id = parseInt(dadosReq.editarId)
    let fim
    let resultado
    let SQL
    let msgRetorno = {
        'alterado': null,
        'msg': ''
    }

    if (dadosReq.editarFim != '') {
        fim = tempo.brToen(dadosReq.editarFim)
    } else {
        fim = null
    }

    let codigoProjeto = parseInt(dadosReq.editarCodigo_Projeto)


    Object.keys(dadosReq).forEach((key) => {
        dadosReq[key] = strcontroller.removerAcentos(dadosReq[key])
        if (dadosReq[key].length == 0) {
            if (key != 'editarFim') {
                msgRetorno.alterado = false
                msgRetorno.msg = `Exite campo obrigatorio vazio: ${key}`
                msgRetorno.log = `Campo ${key} é obrigatório`

            }
        }
    })
    console.log('msgRetorno.alterado: ', msgRetorno.alterado)
    if (msgRetorno.alterado == null) {
        let conteudo
        if (fim == null) {
            conteudo = `codigo_projeto= ${codigoProjeto},
                        empresa=upper('${dadosReq.editarEmpresa}'), 
                        descricao=upper('${dadosReq.editarDescricao}'), 
                        descricao_completa=upper('${dadosReq.editarDescricao_Completa}'), 
                        inicio='${inicio}', 
                        fim=${fim}, 
                        gerente=upper('${dadosReq.editarGerente}'), 
                        responsavel=upper('${dadosReq.editarResponsavel}')`
        } else {
            conteudo = `codigo_projeto= ${codigoProjeto},
                        empresa=upper('${dadosReq.editarEmpresa}'), 
                        descricao=upper('${dadosReq.editarDescricao}'), 
                        descricao_completa=upper('${dadosReq.editarDescricao_Completa}'), 
                        inicio='${inicio}', 
                        fim='${fim}', 
                        gerente=upper('${dadosReq.editarGerente}'), 
                        responsavel=upper('${dadosReq.editarResponsavel}')`
        }

        SQL = `UPDATE PROJETOS SET
               ${conteudo}
                 
                WHERE ID =  ${id}`

        let alterar = projetosModel.localizar(SQL)
        let retorno
        retorno = await alterar.then((dados) => {
            return dados;

        });
        if (retorno) {
            SQL = `SELECT  id,codigo_projeto, empresa, descricao, descricao_completa, inicio, fim, gerente, responsavel  FROM PROJETOS WHERE ID = ${id}`
            let buscar = projetosModel.localizar(SQL)
            resultado = await buscar.then((dados) => {
                return dados;
            });
        }

        SQL = undefined

    } else {

        resultado = false
    }

    if (resultado == false) {
        msgRetorno.alterado = false
        msgRetorno.msg = `Registro não foi alterado.`
        return msgRetorno

    } else {
        msgRetorno.alterado = true
        let retorno = { 'msg': `Registro alterado com sucesso.`, 'dados': resultado }

        return retorno

    }



}



module.exports = { incluirProjeto, localizarProjeto, excluir, alterarirProjeto }