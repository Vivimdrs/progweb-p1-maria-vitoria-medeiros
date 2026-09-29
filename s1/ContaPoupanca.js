import { Conta } from './Conta.js';

export class ContaPoupanca extends Conta {
    constructor(numero, titular, taxaMensal = 0.005) {
        super(numero, titular);
        this.taxaMensal = taxaMensal;
    }

    // comportamento que só a poupança tem
    render() {
        const rendimento = this.saldo * this.taxaMensal;
        if (rendimento > 0) this.depositar(rendimento); // usa a interface pública da mãe
        return rendimento;
    }
}