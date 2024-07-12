
  
  // src/userService.ts
  import { ClienteRepository } from './clienteRepository';
  import { Cliente } from "../cliente/cliente";
  import { ClienteVersao } from "../cliente/cliente.versao";

  export class ClienteService {
    private clienteRepository: ClienteRepository;
  
    constructor(clienteRepository: ClienteRepository) {
        this.clienteRepository = clienteRepository;
    }
  
    async buscaUltimaVersao(cpf: string): Promise<Cliente | null> {
        const ret = await this.clienteRepository.buscaUltimaVersao(cpf);
      return ret;
    }
  
    async adiciona(cliente: Cliente): Promise<ClienteVersao | null> {
        const ret = await this.clienteRepository.adiciona(cliente);
      return ret;
    }
  
    async atualiza(cliente: Cliente): Promise<ClienteVersao | null> {
        const ret = await this.clienteRepository.atualiza(cliente);
      return ret;
    }
  }
  