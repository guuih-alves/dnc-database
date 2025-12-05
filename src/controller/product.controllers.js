import bookServices from "../service/product.services.js";

async function createBookController(req, res) {
    const newBook = req.body;
    const userId = req.userId;

    try{
        const createdBook =  await bookServices.createBookService(newBook, userId);
        res.status(201).send(createdBook);
    } catch (error){
        res.status(400).send(error.message)
    }
}

async function findAllBooksController(req, res) {
    try{
        const books =  await bookServices.findAllBookService();
        res.send(books);
    }catch(error){
        res.status(404).send(error.message)
    }
    
}

async function findBookByIdController(req, res) {

        const bookId = req.params.id;

    try{
        const book = await bookServices.findBookByIdService(bookId);
        return res.send(book);
    } catch(error){
        return res.status(404).send(error.message)
    }
}

async function updateBookCotroller(req, res) {
    const updateBook =  req.body;
    console.log(updateBook)
    const bookId = req.params.id;
    const userId = req.userId;

    try{
        const response = await bookServices.updateBookservice(
            updateBook,
            bookId,
            userId
        );
        return res.send(response);
    } catch (error){
        res.status(400).send(error.message)
    }
}

async function deleteBookController(req, res) {

    const bookId = req.params.id;
    const userId = req.userId;

    try{
    const response = await bookServices.deleteBookService(bookId, userId);
    return res.send(response)
    } catch( error){
        res.status(400).send(error.message)
    }
}

async function searchBooksController(req, res) {
    const {search} = req.query

    try{
        const books = await bookServices.searchBookService(search);
        res.send(books);
    }catch( error){
        res.status(400).send(error.message)
    }
}

export default{
    createBookController,
    findAllBooksController,
    findBookByIdController,
    updateBookCotroller,
    deleteBookController,
    searchBooksController
}