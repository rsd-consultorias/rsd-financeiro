import { Transacao } from "../application-core/model/transacao";

export class TransacaoQuery {
    public listarPorTransacaoId(id: string): Array<Transacao> {
        return [];
    }

    public buscarPorId(id: string): Transacao {
        return {} as Transacao;
    }
}