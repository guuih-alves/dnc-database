import inventoryControllers from "../controller/inventory.controllers.js";
import { Router } from "express";


const router = Router()


router.get('/', inventoryControllers.findAllInventoriesController);

router.post('/', inventoryControllers.createInventoryController);

router.get('/search', inventoryControllers.searchInventoriesController);

router.get('/:id', inventoryControllers.findInventoryByIdController);

router.patch('/:id', inventoryControllers.updateInventoryCotroller);

router.delete('/:id',  inventoryControllers.deleteInventoryController);


export default router;