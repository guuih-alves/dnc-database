import saleServices from "../service/sales.services.js";

async function createSaleController(req, res) {
    const newSales= req.body;
    const userId = req.userId;

    try{
        const createdSale =  await saleServices.createSaleService(newSales, userId);
        res.status(201).send(createdSale);
    } catch (error){
        res.status(400).send(error.message)
    }
}

async function findAllSalesController(req, res) {
    try{
        const sales =  await saleServices.findAllSaleService();
        res.send(sales);
    }catch(error){
        res.status(404).send(error.message)
    }
    
}

async function findSaleByIdController(req, res) {

        const saleId = req.params.id;

    try{
        const sale = await clientServices.findClientByIdController(saleId);
        return res.send(sale);
    } catch(error){
        return res.status(404).send(error.message)
    }
}

async function updateSaleCotroller(req, res) {
    const updateSale =  req.body;
    console.log(updateClient)
    const saleId = req.params.id;
    const userId = req.userId;

    try{
        const response = await saleServices.updateSaleservice(
            updateSale,
            saleId,
            userId
        );
        return res.send(response);
    } catch (error){
        res.status(400).send(error.message)
    }
}

async function deleteSaleController(req, res) {

    const saleId = req.params.id;
    const userId = req.userId;

    try{
    const response = await saleServices.deleteSaleService(saleId, userId);
    return res.send(response)
    } catch( error){
        res.status(400).send(error.message)
    }
}

async function searchSaleController(req, res) {
    const {search} = req.query

    try{
        const sales = await clientServices.searchClientService(search);
        res.send(sales);
    }catch( error){
        res.status(400).send(error.message)
    }
}

export default{
    createSaleController,
    findAllSalesController,
    findSaleByIdController,
    updateSaleCotroller,
    deleteSaleController,
    searchSaleController
}