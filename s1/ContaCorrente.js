import { Conta } from './Conta.js';

export class ContaCorrente extends Conta {
    constructor(numero, titular, limite = 500) {
        super(numero, titular); // obrigatório ANTES de usar this
        this.limite = limite;
    }

    // sobrescrita: conta corrente pode entrar no limite
    saldoDisponivel() {
        return this.saldo + this.limite;
    }
    tarifaMensal() {
        return 12.9;
    }
}