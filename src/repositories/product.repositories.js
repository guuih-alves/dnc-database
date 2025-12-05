import db from '../config/database.js'

db.run(`CREATE TABLE IF NOT EXISTS produtos(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT NOT NULL,
    preco INTEGER
    )`);

    function createBookRepository( newBook, userId){
        return new Promise((res, rej) => {
            const { nome, descricao, preco} = newBook;
            db.run(
                `INSERT INTO produtos (nome, descricao, preco) VALUES (?,?,?)`,
                [nome, descricao, preco],
                function(err){
                    if (err){
                        rej(err);
                    }else {
                        res({ id: this.lastID, ...newBook});
                    }
                }
            )
        })
    }

    function findAllBooksRepository(){
        return new Promise((res, rej) => {
            db.all(`SELECT * FROM produtos`, [], (err, rows) => {
                if(err) {
                    rej(err);
                } else{
                    res(rows);
                }
            })
        })
    }

    function findBookByIdRepository(bookId){
        return new Promise ((res, rej) => {
            db.get(`SELECT * FROM produtos WHERE id = ?`,
                [bookId], (err, row) => {
                    if(err){
                        rej(err);
                    } else {
                        res(row)
                    }
                }
            )
        })
    }

    function updateBookRepository( updateBook, bookId){
        return new Promise((res, rej) => {
          const fields = ['nome', 'descricao','preco']

          let query = 'UPDATE produtos SET'
          const values = []

          fields.forEach((field) => {
            if(updateBook[field] !== undefined) {
                query += ` ${field} = ?,`
                values.push(updateBook[field])
            }
          })

          query = query.slice(0, -1)  // elimina ultimo elemento (no caso virgula)
          query += 'WHERE id = ?'
          values.push(bookId)

          db.run(query, values, (err) => {
            if(err){
                rej(err)
            } else{
                res({ id: bookId, ...updateBook});

            }
          })
        })
    }

    function deleteBookRepository(bookId) {
        return new Promise((res, rej) => {
            db.run(`
                    DELETE FROM produtos
                    WHERE id = ? 
                `, [bookId], function (err) {
                    if(err) {
                        rej(err)
                    } else {
                        res({ message: 'Produto deletado', bookId})
                    }
                })
        })
    }

    function searchBookRepository(search){
        return new Promise(( res, rej) => {
            db.all(`
                SELECT * FROM produtos WHERE
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
        createBookRepository,
        findAllBooksRepository,
        findBookByIdRepository,
        updateBookRepository,
        deleteBookRepository,
        searchBookRepository
    }