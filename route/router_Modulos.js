const modulos_controller = require('../Controller/modulos_Controller.js')


const routerModulos = (app) => {
    app.get('/modulos', (req, res) => {
        let retorno = { 'msg': '', 'dados': [] }
        res.render('paginas/modulos/home', { retorno });
    })
    app.get('/modulos/localizar', async(req, res) => {
        try {
            let retorno = { 'msg': '', 'dados': [] }
            retorno.dados = await modulos_controller.localizar(req.query.editLocalizarModulos)
            if (retorno.dados) {
                res.render('paginas/modulos/homeModulos', { retorno });
            } else {
                retorno.msg = 'Dados não localizados'

                res.render('paginas/modulos/homeModulos', { retorno });

            }
        } catch (error) {
            console.log('Erro ao localizar: ', error)
        }

    })

    app.post('/modulos/novo', async(req, res) => {

        if (req.body.editCodigo_Projeto == '') {
            let retorno = { 'msg': 'Campo Módulo  é Obrigatório', 'dados': [], }
            res.render('paginas/modulos/homeModulos', { retorno });
        } else {

            let moduloexiste = await modulos_controller.localizar(req.body.editModulo)

            if (moduloexiste.length > 0) {
                let retorno = { 'msg': `Códiogo ${req.body.editModulo} já esta cadastrado!`, 'dados': [], }
                res.render('paginas/modulos/home', { retorno });
            } else {
                try {
                    let retorno
                    retorno = await modulos_controller.incluir(req.body)
                        // if (retorno.incluido) {
                    res.render('paginas/modulos/home', { retorno });
                    // } else {
                    //   res.render('paginas/modulos/home', { retorno });

                    //}
                } catch (error) {
                    retorno.msg = `Erro na inclusão: ${error}`
                    res.render('paginas/modulos/home', { retorno });
                    //res.send(error)
                }
            }
        }

    })

    app.get('/modulos/delete/:id', async(req, res) => {
        let excluido = await modulos_controller.excluir(req.params.id)
        if (!excluido) {
            let retorno = { 'msg': 'Registro excluído com sucesso.', }
            res.render('paginas/modulos/home', { retorno })
        } else {
            let retorno = { 'msg': 'Registro não excluído.', }
            res.render('paginas/modulos/home', { retorno })
        }
    })

    app.post('/modulos/alterar', async(req, res) => {
        let retorno
        retorno = await modulos_controller.alterar(req.body)
            // if (retorno) {
            //     res.render('paginas/modelos/home', { retorno })
            // } else {
        res.render('paginas/modulos/home', { retorno })
            //}
    });

    app.get('/modulos/api/', async(req, res) => {
        let apiModulos
        apiModulos = await modulos_controller.localizar('')

        if (apiModulos) {
            res.json(apiModulos);
        } else {
            res.json({ dados: 'Não foi localizado nenhum Módulo!' })
        }
    })

    app.get('/modulos/api/:id', async(req, res) => {
        let apiModulos

        apiModulos = await modulos_controller.localizar(req.params.id)
        console.log('apiModulos: ', apiModulos)
        if (apiModulos) {
            res.json(apiModulos);
        } else {
            res.json({ dados: 'Não foi localizado nenhum Módulo!' })
        }
    })

}































































module.exports = routerModulos