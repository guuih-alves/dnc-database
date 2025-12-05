import clientServices from "../service/client.services.js";

async function createClientController(req, res) {
    const newClient = req.body;
    const userId = req.userId;

    try{
        const createdClient =  await clientServices.createClientService(newClient, userId);
        res.status(201).send(createdClient);
    } catch (error){
        res.status(400).send(error.message)
    }
}

async function findAllClientsController(req, res) {
    try{
        const clients =  await clientServices.findAllClientService();
        res.send(clients);
    }catch(error){
        res.status(404).send(error.message)
    }
    
}

async function findClientByIdController(req, res) {

        const clientId = req.params.id;

    try{
        const client = await clientServices.findClientByIdService(clientId);
        return res.send(client);
    } catch(error){
        return res.status(404).send(error.message)
    }
}

async function updateClientCotroller(req, res) {
    const updateClient =  req.body;
    console.log(updateClient)
    const clientId = req.params.id;
    const userId = req.userId;

    try{
        const response = await clientServices.updateClientservice(
            updateClient,
            clientId,
            userId
        );
        return res.send(response);
    } catch (error){
        res.status(400).send(error.message)
    }
}

async function deleteClientController(req, res) {

    const clientId = req.params.id;
    const userId = req.userId;

    try{
    const response = await clientServices.deleteClientService(clientId, userId);
    return res.send(response)
    } catch( error){
        res.status(400).send(error.message)
    }
}

async function searchClientsController(req, res) {
    const {search} = req.query

    try{
        const clients = await clientServices.searchClientService(search);
        res.send(clients);
    }catch( error){
        res.status(400).send(error.message)
    }
}

export default{
    createClientController,
    findAllClientsController,
    findClientByIdController,
    updateClientCotroller,
    deleteClientController,
    searchClientsController
}