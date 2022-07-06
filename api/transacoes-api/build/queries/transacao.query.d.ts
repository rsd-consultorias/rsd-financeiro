import { Transacao } from "../application-core/model/transacao";
export declare class TransacaoQuery {
    listarPorTransacaoId(id: string): Array<Transacao>;
    buscarPorId(id: string): Transacao;
}
