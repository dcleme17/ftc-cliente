import { ClienteService } from '../repositorio/clienteService';
import { ClienteRepository } from '../repositorio/clienteRepository';
import { Cliente } from './cliente';
import { ClienteVersao } from './cliente.versao';
jest.mock('../repositorio/clienteRepository');

describe('ClienteService', () => {
  let clienteService: ClienteService;
  let clienteRepository: jest.Mocked<ClienteRepository>;

  beforeEach(() => {
    clienteRepository = new ClienteRepository() as jest.Mocked<ClienteRepository>;
    clienteService = new ClienteService(clienteRepository);
  });

  it('devePermitirObterUltimaVersao', async () => {
    //Given
    const cpf = "12345678909";
    let cli = new Cliente("Nome Teste","12345678909","nome.teste@gmail.com", "1",new ClienteVersao("1", new Date()));
    clienteRepository.buscaUltimaVersao.mockResolvedValue(cli);

    //When
    const result = await clienteService.buscaUltimaVersao(cpf);
    
    //Then
    //expect(result).toBeNull();
    expect(clienteRepository.buscaUltimaVersao).toHaveBeenCalledTimes(1);
    expect(clienteRepository.buscaUltimaVersao).toHaveBeenCalledWith(cpf);
    expect(result).toBe(cli);
  });

  it('deveRetornarNullSeNaoEncontrarCliente', async () => {
    //Given
    const cpf = '12345678900';
    clienteRepository.buscaUltimaVersao.mockResolvedValue(null);

    //When
    const result = await clienteService.buscaUltimaVersao(cpf);

    //Then
    expect(clienteRepository.buscaUltimaVersao).toHaveBeenCalledTimes(1);
    expect(clienteRepository.buscaUltimaVersao).toHaveBeenCalledWith(cpf);
    expect(result).toBeNull();
  });

  it('deveRetornarErroAobuscaUltimaVersao', async () => {
    //Given
    const cpf = '12345678900';

    //When
    clienteRepository.buscaUltimaVersao.mockRejectedValue(new Error('Erro no método buscaUltimaVersao'));

    //Then
    await expect(clienteService.buscaUltimaVersao(cpf)).rejects.toThrow('Erro no método buscaUltimaVersao');
  });

  it('deveRetornarNullParaCpfInvalido', async () => {
    //Given
    const cpf = 'invalid_cpf';
    clienteRepository.buscaUltimaVersao.mockResolvedValue(null);

    //When
    const result = await clienteService.buscaUltimaVersao(cpf);

    //Then
    expect(clienteRepository.buscaUltimaVersao).toHaveBeenCalledTimes(1);
    expect(clienteRepository.buscaUltimaVersao).toHaveBeenCalledWith(cpf);
    expect(result).toBeNull();
});


  it('devePermitirAdicionarCliente', async () => {

    //Given
    let cli = new Cliente("Nome Teste","12345678909","nome.teste@gmail.com", "1",new ClienteVersao("1", new Date()));
    let versao = new ClienteVersao("1", new Date());
    clienteRepository.adiciona.mockResolvedValue(versao);

    //When
    const result = await clienteService.adiciona(cli);
    
    //Then
    //expect(result).toBeNull();
    expect(clienteRepository.adiciona).toHaveBeenCalledTimes(1);
    expect(clienteRepository.adiciona).toHaveBeenCalledWith(cli);
    expect(result).toBe(versao);
  });

  it('devePermitirAtualizarCliente', async () => {

    //Given
    let cli = new Cliente("Nome Teste","12345678909","nome.teste@gmail.com", "1",new ClienteVersao("1", new Date()));
    let versao = new ClienteVersao("1", new Date());
    clienteRepository.atualiza.mockResolvedValue(versao);

    //When
    const result = await clienteService.atualiza(cli);

    //Then
    //expect(result).toBeNull();
    expect(clienteRepository.atualiza).toHaveBeenCalledTimes(1);
    expect(clienteRepository.atualiza).toHaveBeenCalledWith(cli);
    expect(result).toBe(versao);
  });
});