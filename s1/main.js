import { Conta } from './Conta.js';

const conta = new Conta('0001', 'Ana Lima');
conta.depositar(100);
conta.sacar(30);
console.log('Saldo:', conta.saldo);

// Quatro tentativas de burlar as regras
const tentativas = [
    () => { conta.saldo = -5000; },
    () => conta.depositar(-50),
    () => conta.sacar(1000),
    () => { conta.titular = ''; },
];

for (const tentar of tentativas) {
    try {
        tentar();
    } catch (e) {
        console.log('Bloqueado →', e.message);
    }
}

console.log('Saldo continua:', conta.saldo);
console.log(conta);