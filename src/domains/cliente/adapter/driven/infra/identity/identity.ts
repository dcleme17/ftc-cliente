import { Cliente } from "domains/cliente/core/entities/cliente";
import { ClienteVersao } from "domains/cliente/core/entities/cliente.versao";
import admin from "firebase-admin"
import { Auth, CreateRequest, UserRecord } from "firebase-admin/auth";
import jwt from 'jsonwebtoken'

export class Identity {
    app: admin.app.App
    serviceAccount: any

    constructor() {

        try{

            console.warn(process.env.SERVICE_ACCOUNT!)
            
            this.serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT!)

            const cert = {
                projectId: this.serviceAccount.project_id,
                clientEmail: this.serviceAccount.client_email,
                privateKey: this.serviceAccount.private_key
            }

            this.app = admin.apps[0] || admin.initializeApp({
                credential: admin.credential.cert(cert)
            })

        }catch(error) {
            console.error(error)
        }
    }

    getIdentity(): Auth {
        return this.app?.auth()
    }

    createUser(cliente: Cliente): Promise<UserRecord> {

        const payload: CreateRequest = {
            email: cliente.getEmail(),
            emailVerified: false,
            password: cliente.getCpf(),
            displayName: cliente.getNome(),
            disabled: false,
        }

        return this.getIdentity().createUser(payload)
    }

    createCustomToken(cliente: Cliente, claims: any): Promise<string> {
       
        return this.getIdentity().createCustomToken(
            cliente.getIdentity()!, 
            claims)
    }

    async verifyIdToken(token: string): Promise<Cliente>  {

        const verified: jwt.JwtPayload = (
        jwt.verify(
            token,
            this.serviceAccount.private_key
        )) as jwt.JwtPayload

    return new Cliente(
        verified?.claims.cpf,
        verified?.claims.nome,
        verified?.claims.email!,
        verified?.uid,
        new ClienteVersao(
            verified?.claims.versao,
            verified?.claims.dataCadastro
        )
    )
         
    }
}