import clientControllers from "../controller/client.controllers.js"
import { Router } from "express";


const router = Router()


router.get('/', clientControllers.findAllClientsController);

router.post('/', clientControllers.createClientController);

router.get('/search', clientControllers.searchClientsController);

router.get('/:id', clientControllers.findClientByIdController);

router.patch('/:id', clientControllers.updateClientCotroller);

router.delete('/:id',  clientControllers.deleteClientController);


export default router;