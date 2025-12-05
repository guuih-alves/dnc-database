import bookControllers from "../controller/product.controllers.js";
import { Router } from "express";

const router = Router()

router.get('/', bookControllers.findAllBooksController);

router.post('/', bookControllers.createBookController);

router.get('/search', bookControllers.searchBooksController);

router.get('/:id', bookControllers.findBookByIdController);

router.patch('/:id', bookControllers.updateBookCotroller);

router.delete('/:id',  bookControllers.deleteBookController);


export default router;