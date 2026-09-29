import { Conta } from './Conta.js';

const c1 = new Conta('0001', 'Ana Lima');
const c2 = new Conta('0002', 'Bruno Souza');

c1.depositar(100);
c1.sacar(30);

console.log(c1);
console.log('Saldo da c2:', c2.saldo); // cada objeto tem o seu próprio estado

// O que a segunda-feira prometeu: class é açúcar sobre protótipos
console.log(typeof Conta);
console.log(Object.getPrototypeOf(c1) === Conta.prototype);
console.log(Object.hasOwn(c1, 'sacar'));