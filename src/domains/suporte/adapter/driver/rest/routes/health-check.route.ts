import { CustomResponse } from 'domains/suporte/entities/custom.response';
import { Router, Request, Response, NextFunction } from 'express'

const router = Router();

router.get('/v1',
  (_request: Request, _response: Response, next: NextFunction) => {
        /**
        @Swagger
        #swagger.auto = true
        #swagger.summary = 'Health Check da API'
        #swagger.description = 'Health Check da API'
        #swagger.operationId = 'gethealthcheck'
        #swagger.deprecated = false
        #swagger.security = [{
          "JWT": []
        }]        
        #swagger.tags = ['Pedido']
    */ 
    return next(new CustomResponse(200, 'OK - FASE 3.', null));
  });


export default router;
