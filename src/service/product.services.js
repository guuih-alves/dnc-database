import bookRepositories from "../repositories/product.repositories.js";

async function createBookService(newBook, userId) {
    const createdBook = await bookRepositories.createBookRepository(
        newBook,
        userId
        );
        
        if (!createdBook) throw new Error ('Error creating product');
        return createdBook;
}

async function findAllBookService() {
    const books = await bookRepositories.findAllBooksRepository();
    return books;
}

async function findBookByIdService(bookId) {
    const book = await bookRepositories.findBookByIdRepository(bookId);
    if (!book) throw new Error ('product not found');
    return book;
}

async function updateBookservice(updateBook, bookId, userId) {
    const book = await bookRepositories.findBookByIdRepository(bookId);
    if(!book) throw new Error ('product not found');
    if(book.userId !== userId) throw new Error ('Unauthorized');
    const response = await bookRepositories.updateBookRepository(
        updateBook, bookId
    );
    return response;
}

async function deleteBookService(bookId, userId) {
    const book = await bookRepositories.findBookByIdRepository(bookId);
    if (!book) throw new Error ('product not found');
       // if (book.userId !== userId) throw new Error('Unauthorizes');
        const response = await bookRepositories.deleteBookRepository(bookId);
        return response;
    
}

async function searchBookService(search) {
    if (!search) return await bookRepositories.findAllBooksRepository(); // Se nada for achado na pesquisa, sera retornando a lista completa
    const books = await bookRepositories.searchBookRepository(search);
    return books;
}

export default {
    createBookService,
    findAllBookService,
    findBookByIdService,
    updateBookservice,
    deleteBookService,
    searchBookService
}