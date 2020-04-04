const conectar = require('../config/bd_Config')

const firebird = require('node-firebird');

let options = conectar
let pool = firebird.pool(5, options)


const incluir = (SQL) => {
    return new Promise((resolve, reject) => {

        firebird.attach(options, async function(err, db) {

            if (err) {
                throw err;
                console.log('Erro:', err)
            }

            db.query(SQL, null, function(err, result) {
                if (!err) {
                    console.log('Dados inseridos com sucesso.')

                    db.query(`SELECT MAX(ID) FROM PROJETOS `, async function(err, result) {
                        console.log('Ultimo registro Inserido:', result);

                        db.detach();
                        resolve(result[0].MAX)
                    })

                } else {
                    console.log('Erro ao incluir:', err)
                    resolve(false)
                }

            });
            db.detach();
        });


    })

}
const localizar = (SQL) => {
    return new Promise((resolve, reject) => {

        firebird.attach(options, async function(err, db) {

            if (err) {
                throw err;
                console.log('Erro:', err)
            }

            db.query(SQL, null, function(err, result) {
                console.log(SQL)
                if (!err) {
                    console.log(result)
                    db.detach();
                    resolve(result)


                } else {

                    resolve(false)
                }
                db.detach();
            });

        });


    })

}

module.exports = { incluir, localizar }