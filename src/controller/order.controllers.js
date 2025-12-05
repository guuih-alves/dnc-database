import orderServices from "../service/order.services.js";

async function createOrderController(req, res) {
    const newOrder = req.body;
    const userId = req.userId;

    try{
        const createdOrder =  await orderServices.createOrderService(newOrder, userId);
        res.status(201).send(createdOrder);
    } catch (error){
        res.status(400).send(error.message)
    }
}

async function findAllOrdersController(req, res) {
    try{
        const orders =  await orderServices.findAllOrderService();
        res.send(orders);
    }catch(error){
        res.status(404).send(error.message)
    }
    
}

async function findOrderByIdController(req, res) {

        const orderId = req.params.id;

    try{
        const order = await orderServices.findOrderByIdService(orderId);
        return res.send(order);
    } catch(error){
        return res.status(404).send(error.message)
    }
}

async function updateOrderCotroller(req, res) {
    const updateOrder =  req.body;
    console.log(updateOrder)
    const orderId = req.params.id;
    const userId = req.userId;

    try{
        const response = await orderServices.updateOrderservice(
            updateBook,
            orderId,
            userId
        );
        return res.send(response);
    } catch (error){
        res.status(400).send(error.message)
    }
}

async function deleteOrderController(req, res) {

    const orderId = req.params.id;
    const userId = req.userId;

    try{
    const response = await orderServices.deleteOrderService(orderId, userId);
    return res.send(response)
    } catch( error){
        res.status(400).send(error.message)
    }
}

async function searchOrdersController(req, res) {
    const {search} = req.query

    try{
        const orders = await orderServices.searchOrderService(search);
        res.send(orders);
    }catch( error){
        res.status(400).send(error.message)
    }
}

export default{
    createOrderController,
    findAllOrdersController,
    findOrderByIdController,
    updateOrderCotroller,
    deleteOrderController,
    searchOrdersController
}