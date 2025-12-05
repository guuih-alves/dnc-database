import express from "express";
import {routers} from "./src/routes/index.js";
import "dotenv/config"
const app = express();

const port = process.env.port || 3000

app.use(express.json());            //Informar que aplicação usa JSON, contrario ira retornar null
app.use(routers)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});

export { routers}