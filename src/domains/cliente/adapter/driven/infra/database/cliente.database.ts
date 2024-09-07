import { Cliente } from "domains/cliente/core/entities/cliente";
import { MongoDB } from "domains/suporte/infra/database/mongodb";
import { ICliente } from "domains/cliente/core/applications/ports/cliente.port";
import { ClienteVersao } from "domains/cliente/core/entities/cliente.versao";

export class ClienteDatabase extends MongoDB implements ICliente {
    
    constructor() {
        console.info(process.env.DATABASE_URL)
        super(process.env.DATABASE_URL!);
    }
    
    async adiciona(cliente: Cliente): Promise<ClienteVersao | null> {
        
        const clienteRef = await this.getCollection('lanchonete', 'clientes').then();
        
        const result = await clienteRef.insertOne({
            cpf: cliente.getCpf(),
            nome: cliente.getNome(),
            email: cliente.getEmail(),
            identity: cliente.getIdentity()
        });

        return new ClienteVersao(result.insertedId.toString(), result.insertedId.getTimestamp())
        
    }
    
    async atualiza(cliente: Cliente): Promise<ClienteVersao | null> {
        return this.adiciona(cliente);
    }

    async buscaUltimaVersao(cpf: string): Promise<Cliente | null>{

        const clienteRef = await this.getCollection('lanchonete', 'clientes').then()

        const cursor = clienteRef.find( 
            { $and: 
                [ {cpf}] 
            } , {
                sort: {_id: "desc"}
            }
        ).limit(1)

        let data

        for await (const doc of cursor) {
            data = doc
        }

        if (!data) {
            return null
        }

        return  new Cliente(
            data?.cpf,
            data?.nome,
            data?.email,
            data?.identity,
            new ClienteVersao(
                data?._id.toString(),
                data?._id.getTimestamp()
            )
        )
    }    
    
    
    async buscaPorParametro(parametro: string): Promise<Array<Cliente>>{

        const clienteRef = await this.getCollection('lanchonete', 'clientes').then()

        const cursor = clienteRef.find( 
            { $and: 
                [ {parametro}] 
            }
        )

        let data = [];

        for await (const doc of cursor) {
            data.push(new Cliente(
                doc?.cpf,
                doc?.nome,
                doc?.email,
                doc?.identity,
                new ClienteVersao(
                    doc?._id.toString(),
                    doc?._id.getTimestamp()
                ))
            )
        }

        return data;
    }    
}