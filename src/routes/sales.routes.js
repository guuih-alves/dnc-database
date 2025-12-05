import salesControllers from "../controller/sales.controllers.js";
import { Router } from "express";


const router = Router()


router.get('/', salesControllers.findAllSalesController);

router.post('/', salesControllers.createSaleController);

router.get('/search', salesControllers.searchSaleController);

router.get('/:id', salesControllers.findSaleByIdController);

router.patch('/:id', salesControllers.updateSaleCotroller);

router.delete('/:id',  salesControllers.deleteSaleController);


export default router;