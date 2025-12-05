import db from '../config/database.js'

db.run(`CREATE TABLE IF NOT EXISTS inventory(
    id_estoque INTEGER PRIMARY KEY AUTOINCREMENT,
    id_produto INTEGER,
    quantidade INTEGER,
    localizacao VARCHAR(20),
    FOREIGN KEY (id_produto) REFERENCES produtos(id)
   
    )`);

    function createInventoryRepository( newInventory, userId){
        return new Promise((res, rej) => {
            const {id_produto, quantidade, localizacao} = newInventory;
            db.run(
                `INSERT INTO inventory (id_produto, quantidade, localizacao ) VALUES (?,?,?)`,
                [id_produto, quantidade, localizacao],
                function(err){
                    if (err){
                        rej(err);
                    }else {
                        res({ id: this.lastID, ...newInventory});
                    }
                }
            )
        })
    }

    function findAllInventorRepository(){
        return new Promise((res, rej) => {
            db.all(`SELECT * FROM inventory`, [], (err, rows) => {
                if(err) {
                    rej(err);
                } else{
                    res(rows);
                }
            })
        })
    }

    function findInventorByIdRepository(inventoryId){
        return new Promise ((res, rej) => {
            db.get(`SELECT * FROM inventory WHERE id = ?`,
                [inventoryId], (err, row) => {
                    if(err){
                        rej(err);
                    } else {
                        res(row)
                    }
                }
            )
        })
    }

    function updateInventorRepository( updateInventory, inventoryId){
        return new Promise((res, rej) => {
          const fields = ['id_produto', 'quantidade', 'localizacao',]

          let query = 'UPDATE inventory SET'
          const values = []

          fields.forEach((field) => {
            if(updateInventory[field] !== undefined) {
                query += ` ${field} = ?,`
                values.push(updateInventory[field])
            }
          })

          query = query.slice(0, -1)  // elimina ultimo elemento (no caso virgula)
          query += 'WHERE id = ?'
          values.push(inventoryId)

          db.run(query, values, (err) => {
            if(err){
                rej(err)
            } else{
                res({ id: inventoryId, ...updateInventory});

            }
          })
        })
    }

    function deleteInventorRepository(inventoryId) {
        return new Promise((res, rej) => {
            db.run(`
                    DELETE FROM inventory
                    WHERE id = ? 
                `, [inventoryId], function (err) {
                    if(err) {
                        rej(err)
                    } else {
                        res({ message: 'Item deletado', inventoryId})
                    }
                })
        })
    }

    function searchInventorRepository(search){
        return new Promise(( res, rej) => {
            db.all(`
                SELECT * FROM inventory WHERE
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
        createInventoryRepository,
        findAllInventorRepository,
        findInventorByIdRepository,
        updateInventorRepository,
        deleteInventorRepository,
        searchInventorRepository
    }