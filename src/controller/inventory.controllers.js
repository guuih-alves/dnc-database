
import inventoryServices from "../service/inventory.services.js";

async function createInventoryController(req, res) {
    const newInventory = req.body;
    const userId = req.userId;

    try{
        const createdInventory =  await inventoryServices.createInventoryService(newInventory, userId);
        res.status(201).send(createdInventory);
    } catch (error){
        res.status(400).send(error.message)
    }
}

async function findAllInventoriesController(req, res) {
    try{
        const inventories =  await inventoryServices.findAllInventoryService();
        res.send(inventories);
    }catch(error){
        res.status(404).send(error.message)
    }
    
}

async function findInventoryByIdController(req, res) {

        const inventoryId = req.params.id;

    try{
        const inventory = await inventoryServices.findInventoryByIdService(inventoryId);
        return res.send(inventory);
    } catch(error){
        return res.status(404).send(error.message)
    }
}

async function updateInventoryCotroller(req, res) {
    const updateInventory =  req.body;
    console.log(updateInventory)
    const inventoryId = req.params.id;
    const userId = req.userId;

    try{
        const response = await inventoryServices.updateInventoryservice(
            updateInventory,
            inventoryId,
            userId
        );
        return res.send(response);
    } catch (error){
        res.status(400).send(error.message)
    }
}

async function deleteInventoryController(req, res) {

    const inventoryId = req.params.id;
    const userId = req.userId;

    try{
    const response = await inventoryServices.deleteInventoryService(inventoryId, userId);
    return res.send(response)
    } catch( error){
        res.status(400).send(error.message)
    }
}

async function searchInventoriesController(req, res) {
    const {search} = req.query

    try{
        const inventories = await inventoryServices.searchInventoryService(search);
        res.send(inventories);
    }catch( error){
        res.status(400).send(error.message)
    }
}

export default{
    createInventoryController,
    findAllInventoriesController,
    findInventoryByIdController,
    updateInventoryCotroller,
    deleteInventoryController,
    searchInventoriesController
}