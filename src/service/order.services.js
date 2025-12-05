import orderRepositories from "../repositories/order.repositories.js";

async function createOrderService(newOrder, userId) {
    const createdOrder = await orderRepositories.createOrderRepository(
        newOrder,
        userId
        );
        
        if (!createdOrder) throw new Error ('Error creating order');
        return createdOrder;
}

async function findAllOrderService() {
    const orders = await orderRepositories.findAllOrdersRepository();
    return orders;
}

async function findOrderByIdService(orderId) {
    const order = await orderRepositories.findOrderByIdRepository(orderId);
    if (!order) throw new Error ('Order not found');
    return order;
}

async function updateOrderservice(updateOrder, orderId, userId) {
    const order = await bookRepositories.findBookByIdRepository(orderId);
    if(!order) throw new Error ('Order not found');
    if(book.userId !== userId) throw new Error ('Unauthorized');
    const response = await orderRepositories.updateOrderRepository(
        updateOrder, orderId
    );
    return response;
}

async function deleteOrderService(orderId, userId) {
    const order = await orderRepositories.findOrderByIdRepository(orderId);
    if (!order) throw new Error ('Order not found');
       // if (book.userId !== userId) throw new Error('Unauthorizes');
        const response = await orderRepositories.deleteOrderRepository(orderId);
        return response;
    
}

async function searchOrderService(search) {
    if (!search) return await orderRepositories.findAllOrdersRepository(); // Se nada for achado na pesquisa, sera retornando a lista completa
    const orders = await orderRepositories.searchOrderRepository(search);
    return orders;
}

export default {
    createOrderService,
    findAllOrderService,
    findOrderByIdService,
    updateOrderservice,
    deleteOrderService,
    searchOrderService
}