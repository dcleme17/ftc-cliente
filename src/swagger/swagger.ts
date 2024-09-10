import {
    post_cliente, 
    put_cliente,
    post_cliente_autenticacao,
    put_cliente_lgpd

} from 'domains/cliente/adapter/driver/rest/swagger/acesso.swagger'

export const swagger = {
    swagger: "2.0",
    info: {
        version: '1.0.0',           
        title: 'Tech Challenge Fiap',              
        description: 'Conjuntos dde recursos e operações do Tech Challenge da FIAP'
    },
    host: ["backend-koxvlyfy2a-rj.a.run.app"],
    // host: ["localhost:31300"],
    schemes: ["https", "http"],
    tags: [                   
        {
            name: 'Cliente',             
            description: 'APIs do domínio de Clientes'       
        }        
    ],
    definitions: {
        post_cliente,
        put_cliente,
        post_cliente_autenticacao,
        put_cliente_lgpd
    },
    securityDefinitions: {
        JWT: {
          type: 'apiKey',
          in: 'header', 
          name: 'Authorization', 
          description: 'JWT Access Token - Incluir o Bearer'
        }
    },
    "x-google-backend": {
        "address": "https://backend-koxvlyfy2a-rj.a.run.app",
        "jwt_audience": "https://backend-koxvlyfy2a-rj.a.run.app"
    },        
}