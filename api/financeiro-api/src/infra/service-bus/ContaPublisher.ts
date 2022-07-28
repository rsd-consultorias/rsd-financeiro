import { Conta } from "../../core/model/Conta";

export function publicarContaCriada(conta: Conta) {
    console.log(JSON.stringify(conta));
}