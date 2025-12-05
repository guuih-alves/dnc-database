import { Router } from "express";

import productRouter from './product.routes.js'
import clientRouter from './client.routes.js'
import saleRouter from './sales.routes.js'
import orderRouter from './orders.routes.js'
import inventoryRouter from './inventory.routes.js'

const routers = Router();

routers.use("/produtos",productRouter);
routers.use("/clients", clientRouter);
routers.use("/sales", saleRouter)
routers.use("/orders", orderRouter)
routers.use("/inventory", inventoryRouter)

export { routers};