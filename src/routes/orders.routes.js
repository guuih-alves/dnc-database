import orderControllers from "../controller/order.controllers.js";
import { Router } from "express";


const router = Router()


router.get('/', orderControllers.findAllOrdersController);

router.post('/', orderControllers.createOrderController);

router.get('/search', orderControllers.searchOrdersController);

router.get('/:id', orderControllers.findOrderByIdController);

router.patch('/:id', orderControllers.updateOrderCotroller);

router.delete('/:id',  orderControllers.deleteOrderController);


export default router;