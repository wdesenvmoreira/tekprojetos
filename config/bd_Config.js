let options = {};

const conectar = () => {
    options.host = 'Note-0097';
    options.port = 3054;
    options.database = 'C:/TekEstudos/TekProjetos/Bd/TEKPROJETOS.FDB';
    options.user = 'SYSDBA';
    options.password = 'masterkey';
    options.lowercase_keys = false; // set to true to lowercase keys
    options.role = null; // default
    options.pageSize = 4096; // default when creating database

    return options
}

module.exports = conectar()