import db from '../config/database.js'

db.run(`CREATE TABLE IF NOT EXISTS clients(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_usuario TEXT NOT NULL,
    email_usuario TEXT NOT NULL,
    cpf_usuario VARCHAR(14) UNIQUE
    )`);

    function createClientRepository( newClient, userId){
        return new Promise((res, rej) => {
            const { nome_usuario, email_usuario, cpf_usuario} = newClient;
            db.run(
                `INSERT INTO clients (nome_usuario, email_usuario, cpf_usuario) VALUES (?,?,?)`,
                [nome_usuario, email_usuario, cpf_usuario],
                function(err){
                    if (err){
                        rej(err);
                    }else {
                        res({ id: this.lastID, ...newClient});
                    }
                }
            )
        })
    }

    function findAllClientRepository(){
        return new Promise((res, rej) => {
            db.all(`SELECT * FROM clients`, [], (err, rows) => {
                if(err) {
                    rej(err);
                } else{
                    res(rows);
                }
            })
        })
    }

    function findClientByIdRepository(clientId){
        return new Promise ((res, rej) => {
            db.get(`SELECT * FROM clients WHERE id = ?`,
                [clientId], (err, row) => {
                    if(err){
                        rej(err);
                    } else {
                        res(row)
                    }
                }
            )
        })
    }

    function updateClientRepository( updateClient, clientId){
        return new Promise((res, rej) => {
          const fields = ['nome_usuario', 'email_usuario','cpf_usuario']

          let query = 'UPDATE clients SET'
          const values = []

          fields.forEach((field) => {
            if(updateClient[field] !== undefined) {
                query += ` ${field} = ?,`
                values.push(updateClient[field])
            }
          })

          query = query.slice(0, -1)  // elimina ultimo elemento (no caso virgula)
          query += 'WHERE id = ?'
          values.push(clientId)

          db.run(query, values, (err) => {
            if(err){
                rej(err)
            } else{
                res({ id: clientId, ...updateClient});

            }
          })
        })
    }

    function deleteClientRepository(clientId) {
        return new Promise((res, rej) => {
            db.run(`
                    DELETE FROM clients
                    WHERE id = ? 
                `, [clientId], function (err) {
                    if(err) {
                        rej(err)
                    } else {
                        res({ message: 'Cliente deletado', clientId})
                    }
                })
        })
    }

    function searchClientRepository(search){
        return new Promise(( res, rej) => {
            db.all(`
                SELECT * FROM clients WHERE
                title LIKE ? OR author LIKE ?`,
            [`%${search}%` , `%${search}%`],   // ira buscar caracteres da palavra , cada Search refere a cada variavel
            (err, rows) => {
                if (err) {
                    rej(err)
                } else {
                    res(rows)
                }
            }
        )
        })
    }

    export default{
        createClientRepository,
        findAllClientRepository,
        findClientByIdRepository,
        updateClientRepository,
        deleteClientRepository,
        searchClientRepository
    }