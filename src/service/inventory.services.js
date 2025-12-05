import inventoryRepositories from "../repositories/inventory.repositories.js";


async function createInventoryService(newInventory, userId) {
    const createdInventory = await inventoryRepositories.createInventoryRepository(
        newInventory,
        userId
        );
        
        if (!createdInventory) throw new Error ('Error creating Inventory');
        return createdInventory;
}

async function findAllInventoryService() {
    const inventories = await inventoryRepositories.findAllInventorRepository();
    return inventories;
}

async function findInventoryByIdService(inventoryId) {
    const inventory = await inventoryRepositories.findInventorByIdRepository(inventoryId);
    if (!inventory) throw new Error ('Inventory not found');
    return inventory;
}

async function updateInventoryservice(updateInventory, inventoryId, userId) {
    const inventory = await inventoryRepositories.findInventorByIdRepository(inventoryId);
    if(!inventory) throw new Error ('Inventory not found');
    if(book.userId !== userId) throw new Error ('Unauthorized');
    const response = await inventoryRepositories.updateInventorRepository(
        updateInventory, inventoryId
    );
    return response;
}

async function deleteInventoryService(inventoryId, userId) {
    const inventory = await inventoryRepositories.findInventorByIdRepository(inventoryId);
    if (!inventory) throw new Error ('Book not found');
       // if (book.userId !== userId) throw new Error('Unauthorizes');
        const response = await inventoryRepositories.deleteInventorRepository(inventoryId);
        return response;
    
}

async function searchInventoryService(search) {
    if (!search) return await inventoryRepositories.findAllInventorRepository(); // Se nada for achado na pesquisa, sera retornando a lista completa
    const inventories = await inventoryRepositories.searchInventorRepository(search);
    return inventories;
}

export default {
    createInventoryService,
    findAllInventoryService,
    findInventoryByIdService,
    updateInventoryservice,
    deleteInventoryService,
    searchInventoryService
}