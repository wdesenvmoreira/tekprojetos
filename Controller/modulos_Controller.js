//const modulosModel = require('../Model/tekModulos_Model.js')
const modulosModel = require('../Model/tekModulos_Model')
const strcontroller = require('./utils/string_Controller.js')



const incluir = async(dadosReq) => {

    let SQL
    let moduloexiste, desc_modulo, resultado, gravar
    let msgRetorno = {
        'incluido': null,
        'msg': ''
    }

    if (dadosReq.editModulo == '') {

        msgRetorno.msg = `Modulo não incluido, descrição vazia.`
        return msgRetorno
    } else {
        desc_modulo = dadosReq.editModulo.toUpperCase().trim()
        desc_modulo = strcontroller.removerAcentos(desc_modulo)
        moduloexiste = await modulosModel.localizar(`SELECT modulo from modulos where modulo = '${desc_modulo}'`)
        console.log('moduloexiste: ', await moduloexiste.ID_MODULOS)
        if (!moduloexiste.length == 0) {
            msgRetorno.msg = `Módulo, ${desc_modulo}, já cadastrado! `
            return msgRetorno
        } else {
            SQL = `INSERT INTO MODULOS (modulo) VALUES ('${desc_modulo}')`
            console.log(SQL)
            gravar = modulosModel.incluir(SQL)

            resultado = await gravar.then((dados) => {
                return dados;

            });

            SQL = undefined
        }

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

const localizar = async(dadosReq) => {
    console.log('entrou no localizar', dadosReq)
    let SQL = undefined
    if (dadosReq == undefined || dadosReq == '') {
        SQL = `SELECT id_modulo, modulo FROM MODULOS ORDER BY modulo`
    }
    if (dadosReq / 1) {
        SQL = `SELECT id_modulo, modulo FROM MODULOS WHERE id_modulo = ${dadosReq} ORDER BY modulo`
    } else {
        if (dadosReq != '') {
            let upPalavra = dadosReq.toUpperCase().trim()
            SQL = `SELECT id_modulo, modulo FROM MODULOS WHERE modulo LIKE upper('${upPalavra}%') ORDER BY modulo`
        }
    }

    let buscar = modulosModel.localizar(SQL)
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

    SQL = `DELETE FROM MODULOS WHERE ID_MODULO = ${id}`
    try {
        let deletar = modulossModel.localizar(SQL)

        resultado = await deletar.then((dados) => {
            return dados;
        });
    } catch (error) {

        console.log('Erro ao excluir: ', error)

    }

    SQL = undefined

    if (resultado == false) {
        msgRetorno.incluido = false
        msgRetorno.msg = `Registro não foi excluído.`
        return msgRetorno

    } else {
        msgRetorno.incluido = true
        msgRetorno.msg = `Registro excluído com sucesso.`
        return msgRetorno

    }

}

const alterar = async(dadosReq) => {


    let resultado, desc_modulo, moduloexiste
    let SQL
    let msgRetorno = {
        'alterado': null,
        'msg': ''
    }

    if (dadosReq.editarModulo != '') {
        return msgRetorno.msg = `Nova descrição deve ser informada!`
    } else {
        desc_modulo = dadosReq.toUpperCase().trim()
        desc_modulo = strcontroller.removerAcentos(desc_modulo)
        moduloexiste = await modulosModel.localizar(`SELECT modulo from modulos where modulo = '${desc_modulo}'`)

        if (moduloexiste) {
            msgRetorno.msg = `Módulo, ${moduloexiste}, já cadastrado: `
            return msgRetorno
        } else {
            SQL = `UPDATE MODULOS SET modulo = ${desc_modulo} WHERE ID_MODULO = ${dadosReq.editarIdModulo})`
            console.log(SQL)
            gravar = modulosModel.localizar(SQL)

            resultado = await gravar.then((dados) => {
                return dados;

            });
        }

        SQL = undefined


        if (resultado == false) {
            msgRetorno.alterado = false
            msgRetorno.msg = `Registro não foi alterado.`
            return msgRetorno

        } else {
            msgRetorno.alterado = true
            msgRetorno.msg = { 'msg': `Registro alterado com sucesso.`, 'dados': resultado }

            return msgRetorno

        }



    }
}


module.exports = { incluir, localizar, excluir, alterar }