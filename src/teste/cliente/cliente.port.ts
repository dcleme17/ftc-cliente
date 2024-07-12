import { Cliente } from "./cliente"
import { ClienteVersao } from "./cliente.versao"

export interface ICliente {
    adiciona: (cliente: Cliente) => Promise<ClienteVersao | null>
    atualiza: (cliente: Cliente) => Promise<ClienteVersao | null>
    buscaUltimaVersao: (cpf: string) => Promise<Cliente | null>
}