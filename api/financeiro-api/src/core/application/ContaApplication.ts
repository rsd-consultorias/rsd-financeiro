import { EventEmitter } from "stream";
import { IContaRepository } from "../interfaces/IContaRepository";
import { Conta } from "../model/Conta";
import { ApplicationResponse } from "../types/ApplicationResponse";
import { EEventos } from "../types/Eventos.enum";

export class ContaApplication extends EventEmitter {
    
    constructor(private contaRepository: IContaRepository) { 
        super();
    }

    async criarNovaConta(dados: { conta: Conta }): Promise<ApplicationResponse<Conta>> {
        let contaExistente = await this.contaRepository.buscarPorIdentificadorFiscal(dados.conta.identificadorFiscal);

        if (contaExistente.sucesso) {
            return { sucesso: false, mensagem: 'Conta já cadastrada' };
        }

        let contaCriada = await this.contaRepository.incluir(dados.conta);

        if(contaCriada.sucesso){
            this.emit(EEventos.CONTA_CRIADA, contaCriada.body);
        }

        return { sucesso: contaCriada.sucesso, mensagem: contaCriada.mensagem, body: contaCriada.body };
    }
}