import db from '../config/database.js'

db.run(`CREATE TABLE IF NOT EXISTS sales(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    id_pedido INTEGER NOT NULL,
    data_venda DATETIME ,
    status TEXT NOT NULL,
    valor_total FLOAT,
    FOREIGN KEY (id_pedido) REFERENCES orders(id_pedido)
    )`);

    function createSaleRepository( newSale, userId){
        return new Promise((res, rej) => {
            const { id_pedido, data_venda, status, valor_total} = newSale;
            db.run(
                `INSERT INTO sales (id_pedido, data_venda, status, valor_total) VALUES (?,?,?,?)`,
                [id_pedido, data_venda, status, valor_total],
                function(err){
                    if (err){
                        rej(err);
                    }else {
                        res({ id: this.lastID, ...newSale});
                    }
                }
            )
        })
    }

    function findAllSalesRepository(){
        return new Promise((res, rej) => {
            db.all(`SELECT * FROM sales`, [], (err, rows) => {
                if(err) {
                    rej(err);
                } else{
                    res(rows);
                }
            })
        })
    }

    function findSaleByIdRepository(saleId){
        return new Promise ((res, rej) => {
            db.get(`SELECT * FROM sales WHERE id = ?`,
                [saleId], (err, row) => {
                    if(err){
                        rej(err);
                    } else {
                        res(row)
                    }
                }
            )
        })
    }

    function updateSaleRepository( updateSale, saleId){
        return new Promise((res, rej) => {
          const fields = ['id_pedido', 'data_venda', 'status','valor_total']

          let query = 'UPDATE sales SET'
          const values = []

          fields.forEach((field) => {
            if(updateBook[field] !== undefined) {
                query += ` ${field} = ?,`
                values.push(updateSale[field])
            }
          })

          query = query.slice(0, -1)  // elimina ultimo elemento (no caso virgula)
          query += 'WHERE id = ?'
          values.push(saleId)

          db.run(query, values, (err) => {
            if(err){
                rej(err)
            } else{
                res({ id: saleId, ...updateSale});

            }
          })
        })
    }

    function deleteSaleRepository(saleId) {
        return new Promise((res, rej) => {
            db.run(`
                    DELETE FROM sales
                    WHERE id = ? 
                `, [saleId], function (err) {
                    if(err) {
                        rej(err)
                    } else {
                        res({ message: 'Venda deletado', saleId})
                    }
                })
        })
    }

    function searchSaleRepository(search){
        return new Promise(( res, rej) => {
            db.all(`
                SELECT * FROM sales WHERE
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
        createSaleRepository,
        findAllSalesRepository,
        findSaleByIdRepository,
        updateSaleRepository,
        deleteSaleRepository,
        searchSaleRepository
    }