const strcontroller = () => {
    const estavazia = (palavra) => {
        if (!palavra) {
            return true
        } else {
            return false
        }
    }

}

function removerAcentos(s) {
    return s.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
}



module.exports = { strcontroller, removerAcentos }