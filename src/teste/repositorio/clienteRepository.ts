import { Cliente } from "../cliente/cliente";
import { ClienteVersao } from "../cliente/cliente.versao";
import { ICliente } from "../cliente/cliente.port";

export class ClienteRepository  implements ICliente {

  async buscaUltimaVersao(cpf: string): Promise<Cliente | null> {
    console.log(cpf);
    // Implementação da função
    //return null;
    let cliente =  new Cliente("Nome Teste","12345678909","nome.teste@gmail.com", "1",new ClienteVersao("1", new Date()));
    return cliente;
  }

  async adiciona(cliente: Cliente): Promise<ClienteVersao | null> {
    console.log(cliente);
    // Implementação da função
    //return null;
    let versao =  new ClienteVersao("1", new Date());
    cliente = new Cliente("Nome Teste","12345678909","nome.teste@gmail.com", "1", versao)
    return versao;
  }

  async atualiza(cliente: Cliente): Promise<ClienteVersao | null> {
    console.log(cliente);
    // Implementação da função
    //return null;
    let versao =  new ClienteVersao("1", new Date());
    cliente = new Cliente("Nome Teste","12345678909","nome.teste@gmail.com", "1", versao)
    return versao;
  }
}