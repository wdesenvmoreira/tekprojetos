const routerProjetos = require('./router_Projetos.js')
const routerModulos = require('./router_Modulos.js')
const routerGerenciador = (app) => {
    app.get('/', (req, res) => {
        let retorno = { 'msg': '', 'dados': [] }
        res.render('homePrincipal', { retorno });
    })
    routerProjetos(app)
    routerModulos(app)
}
module.exports = routerGerenciador