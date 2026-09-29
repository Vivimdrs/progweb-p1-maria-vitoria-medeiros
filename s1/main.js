import { Conta } from './Conta.js';
import { ContaCorrente } from './ContaCorrente.js';
import { ContaPoupanca } from './ContaPoupanca.js';

const cc = new ContaCorrente('0001', 'Ana Lima', 500);
const cp = new ContaPoupanca('0002', 'Bruno Souza');

cc.depositar(100); // depositar() foi herdado de Conta
cc.sacar(400); // só passa por causa do limite
console.log('CC saldo:', cc.saldo);

cp.depositar(1000);
console.log('Rendeu:', cp.render(), '→ saldo:', cp.saldo);

try {
    cp.sacar(5000); // poupança não tem limite
} catch (e) {
    console.log('Poupança →', e.message);
}

console.log(cc instanceof ContaCorrente, cc instanceof Conta);