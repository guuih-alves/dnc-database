import salesRepositories from "../repositories/sales.repositories.js";


async function createSaleService(newSale, userId) {
    const createdSale = await salesRepositories.createSaleRepository(
        newSale,
        userId
        );
        
        if (!createdSale) throw new Error ('Error creating sales');
        return createdSale;
}

async function findAllSaleService() {
    const sales = await salesRepositories.findAllSalesRepository();
    return sales;
}

async function findSaleByIdService(saleId) {
    const sale = await salesRepositories.findSaleByIdRepository(saleId);
    if (!sale) throw new Error ('sales not found');
    return sale;
}

async function updateSaleservice(updateSale, saleId, userId) {
    const sale = await salesRepositories.findSaleByIdRepository(saleId);
    if(!sale) throw new Error ('sales not found');
    if(sale.userId !== userId) throw new Error ('Unauthorized');
    const response = await clientRepositories.updateClientRepository(
        updateSale, saleId
    );
    return response;
}

async function deleteSaleService(saleId, userId) {
    const sale = await clientRepositories.findClientByIdRepository(saleId);
    if (!sale) throw new Error ('sales not found');
       // if (book.userId !== userId) throw new Error('Unauthorizes');
        const response = await salesRepositories.deleteClientService(saleId);
        return response;
    
}

async function searchSaleService(search) {
    if (!search) return await salesRepositories.findAllSalesRepository(); // Se nada for achado na pesquisa, sera retornando a lista completa
    const sales = await salesRepositories.searchSaleRepository(search);
    return sales;
}

export default {
    createSaleService,
    findAllSaleService,
    findSaleByIdService,
    updateSaleservice,
    deleteSaleService,
    searchSaleService
}