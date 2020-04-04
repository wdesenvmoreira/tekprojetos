const brToen = (data) => {
    let vdata = data.split('/')
    let novadata = vdata[1] + '-' + vdata[0] + '-' + vdata[2]
    return novadata
}

const enToebr = (data) => {
    let vdata = data.split('-')
    let novadata = vdata[0] + '/' + vdata[1] + '/' + vdata[2]
    return novadata
}

const formatData = (data) => {
    dia = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0' + dia : dia,
        mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0' + mes : mes,
        anoF = data.getFullYear();
    return diaF + "/" + mesF + "/" + anoF;
}


module.exports = { brToen, enToebr, formatData }