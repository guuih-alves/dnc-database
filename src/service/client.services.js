import clientRepositories from "../repositories/client.repositories.js";

async function createClientService(newClient, userId) {
    const createdClient = await clientRepositories.createClientRepository(
        newClient,
        userId
        );
        
        if (!createdClient) throw new Error ('Error creating client');
        return createdClient;
}

async function findAllClientService() {
    const clients = await clientRepositories.findAllClientRepository();
    return clients;
}

async function findClientByIdService(clientId) {
    const client = await clientRepositories.findClientByIdRepository(clientId);
    if (!client) throw new Error ('Client not found');
    return client;
}

async function updateClientservice(updateClient, clientId, userId) {
    const client = await clientRepositories.findClientByIdRepository(clientId);
    if(!client) throw new Error ('Client not found');
    if(client.userId !== userId) throw new Error ('Unauthorized');
    const response = await clientRepositories.updateClientRepository(
        updateClient, clientId
    );
    return response;
}

async function deleteClientService(clientId, userId) {
    const client = await clientRepositories.findClientByIdRepository(clientId);
    if (!client) throw new Error ('Book not found');
       // if (book.userId !== userId) throw new Error('Unauthorizes');
        const response = await clientRepositories.deleteClientRepository(clientId);
        return response;
    
}

async function searchClientService(search) {
    if (!search) return await clientRepositories.findAllClientRepository(); // Se nada for achado na pesquisa, sera retornando a lista completa
    const clients = await clientRepositories.searchClientRepository(search);
    return clients;
}

export default {
    createClientService,
    findAllClientService,
    findClientByIdService,
    updateClientservice,
    deleteClientService,
    searchClientService
}