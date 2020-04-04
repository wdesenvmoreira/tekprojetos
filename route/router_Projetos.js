const projetos_controller = require('../Controller/projetos_Controller.js')
const convertedata = require('../Controller/utils/tempo_Controller')
const routerProjetos = (app) => {
    app.get('/projetos', (req, res) => {
        let retorno = { 'msg': '', 'dados': [] }
        res.render('paginas/projetos/home', { retorno });
    })
    app.get('/projetos/localizar', async(req, res) => {
        try {
            let retorno = { 'msg': '', 'dados': [] }
            retorno.dados = await projetos_controller.localizarProjeto(req.query.editLocalizarProjeto)
            if (retorno.dados) {

                res.render('homeProjetos', { retorno });
            } else {
                retorno.msg = 'Dados não localizados'
                res.render(('homeProjetos', retorno));
            }
        } catch (error) {

        }

    })
    app.post('/projetos/novo', async(req, res) => {

        if (req.body.editCodigo_Projeto == '') {
            let retorno = { 'msg': 'Campo Código Projeto é Obrigatório', 'dados': [], }
            res.render('homeProjetos', { retorno });
        } else {


            let codigoProjeto = parseInt(req.body.editCodigo_Projeto)
            let codProj = await projetos_controller.localizarProjeto(codigoProjeto)

            if (codProj.length > 0) {
                let retorno = { 'msg': `Códiogo ${req.body.editCodigo_Projeto} já esta cadastrado!`, 'dados': [], }
                res.render('paginas/projetos/home', { retorno });
            } else {
                try {
                    let retorno
                    retorno = await projetos_controller.incluirProjeto(req.body)
                    if (retorno.incluido) {
                        res.render('paginas/projetos/home', { retorno });
                    } else {
                        res.render('paginas/projetos/home', { retorno });

                    }
                } catch (error) {
                    res.send(error)
                }
            }
        }

    })

    app.get('/projetos/delete/:id', async(req, res) => {
        let excluido = await projetos_controller.excluir(req.params.id)
        if (!excluido) {
            let retorno = { 'msg': 'Registro excluído com sucesso.', }
            res.render('paginas/projetos/home', { retorno })
        } else {
            let retorno = { 'msg': 'Registro não excluído.', }
            res.render('paginas/projetos/home', { retorno })
        }
    })

    app.post('/projetos/alterar', async(req, res) => {
        let retorno //={ 'msg': `Códiogo ${req.body.editCodigo_Projeto} já esta cadastrado!`, 'dados': [], }
        retorno = await projetos_controller.alterarirProjeto(req.body)
        if (retorno) {
            res.render('paginas/projetos/home', { retorno })
        } else {
            res.render('paginas/projetos/home', { retorno })
        }
    });

    app.get('/projetos/api/', async(req, res) => {
        let apiProjetos
        apiProjetos = await projetos_controller.localizarProjeto('')

        if (apiProjetos) {
            for (let index = 0; index < apiProjetos.length; index++) {
                let dtinicio = apiProjetos[index].INICIO
                let dtfim = apiProjetos[index].FIM
                apiProjetos[index].INICIO = convertedata.formatData(dtinicio)

                if (dtfim != null) {
                    apiProjetos[index].FIM = convertedata.formatData(dtfim)
                }

            }
            res.json(apiProjetos);
        } else {
            { dados: 'Não há Projetos' }
        }
    })

    app.get('/projetos/api/:id', async(req, res) => {
        let apiProjetos

        apiProjetos = await projetos_controller.localizarProjeto(req.params.id)

        if (apiProjetos) {
            for (let index = 0; index < apiProjetos.length; index++) {
                let dtinicio = apiProjetos[index].INICIO
                let dtfim = apiProjetos[index].FIM
                apiProjetos[index].INICIO = convertedata.formatData(dtinicio)

                if (dtfim != null) {
                    apiProjetos[index].FIM = convertedata.formatData(dtfim)
                }

            }
            res.json(apiProjetos);
        } else {
            { dados: 'Não há Projetos' }
        }
    })

}
module.exports = routerProjetos