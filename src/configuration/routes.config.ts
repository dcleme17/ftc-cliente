import { Router } from 'express'
import helthCheckRoutes from '../domains/suporte/adapter/driver/rest/routes/health-check.route'
import acessoRoutes from '../domains/cliente/adapter/driver/rest/routes/cliente.route'

const routes = Router()

routes.use('/api/health-check', helthCheckRoutes)
routes.use('/api/clientes', acessoRoutes)

export default routes;
