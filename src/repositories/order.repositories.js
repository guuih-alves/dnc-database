import db from '../config/database.js'

db.run(`CREATE TABLE IF NOT EXISTS orders(
    id_pedido INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id INTEGER,
    data_pedido DATETIME,
    status TEXT NOT NULL,
    FOREIGN KEY (client_id) REFERENCES clients(id)
   
    )`);

    function createOrderRepository( newOrder, userId){
        return new Promise((res, rej) => {
            const {client_id, data_pedido, status} = newOrder;
            db.run(
                `INSERT INTO orders (client_id, data_pedido, status ) VALUES (?,?,?)`,
                [client_id, data_pedido, status],
                function(err){
                    if (err){
                        rej(err);
                    }else {
                        res({ id: this.lastID, ...newOrder});
                    }
                }
            )
        })
    }

    function findAllOrdersRepository(){
        return new Promise((res, rej) => {
            db.all(`SELECT * FROM orders`, [], (err, rows) => {
                if(err) {
                    rej(err);
                } else{
                    res(rows);
                }
            })
        })
    }

    function findOrderByIdRepository(orderId){
        return new Promise ((res, rej) => {
            db.get(`SELECT * FROM orders WHERE id = ?`,
                [orderId], (err, row) => {
                    if(err){
                        rej(err);
                    } else {
                        res(row)
                    }
                }
            )
        })
    }

    function updateOrderRepository( updateOrder, orderId){
        return new Promise((res, rej) => {
          const fields = ['client_id', 'data_pedido', 'status']

          let query = 'UPDATE orders SET'
          const values = []

          fields.forEach((field) => {
            if(updateOrder[field] !== undefined) {
                query += ` ${field} = ?,`
                values.push(updateOrder[field])
            }
          })

          query = query.slice(0, -1)  // elimina ultimo elemento (no caso virgula)
          query += 'WHERE id = ?'
          values.push(orderId)

          db.run(query, values, (err) => {
            if(err){
                rej(err)
            } else{
                res({ id: orderId, ...updateOrder});

            }
          })
        })
    }

    function deleteOrderRepository(orderId) {
        return new Promise((res, rej) => {
            db.run(`
                    DELETE FROM orders
                    WHERE id = ? 
                `, [orderId], function (err) {
                    if(err) {
                        rej(err)
                    } else {
                        res({ message: 'Ordem deletado', orderId})
                    }
                })
        })
    }

    function searchOrderRepository(search){
        return new Promise(( res, rej) => {
            db.all(`
                SELECT * FROM orders WHERE
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
        createOrderRepository,
        findAllOrdersRepository,
        findOrderByIdRepository,
        updateOrderRepository,
        deleteOrderRepository,
        searchOrderRepository
    }