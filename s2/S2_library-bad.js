 // ALUNO: Vitoria Medeiros, Vitorio Gomes
S2_library-bad.js
100%
// ============================================================
// S2_library-bad.js — Mãos à Obra da Semana 2 (Parte A)
// Este código FUNCIONA (rode: node S2_library-bad.js). E é ruim de propósito.
// Sua tarefa, em dupla: NÃO refatore. Apenas leia e marque os cheiros.
//   Use // SMELL: <nome>        para cada code smell (nomes do slide 16)
//   Use // VIOLA: <S|O|L|I|D>   para cada princípio SOLID violado (slide 4)
// ============================================================

class Library { // SMELL: <god class> // VIOLA: <S>
  constructor() {
    this.bks = [];
    this.us = [];
    this.lns = [];
  }

  // SMELL: Long Function
  // VIOLA: <O> uso de cadeias id/else, risco ao add novas funcionalidades
  doStuff(book, userId, action) {
    if (action === 'add') {         // SMELL: Switch sobre tipo (encandeamento de ifs)
      this.bks.push(book);                        
      console.log('Added: ' + book.t);
    } else if (action === 'lend') {
      var u = null;
      for (var i = 0; i < this.us.length; i++) {
        if (this.us[i].id === userId) { u = this.us[i]; }
      }
      var b = null;
      for (var j = 0; j < this.bks.length; j++) {
        if (this.bks[j].t === book.t) { b = this.bks[j]; }
      }
      if (u != null && b != null && b.cp > 0) {
        b.cp = b.cp - 1;
        this.lns.push({ uid: userId, bt: book.t, d: new Date(), st: 1 });  // SMELL: <Magic Numbers
        // 1 = active, 2 = returned, 3 = overdue    // SMELL: comentario desodorante
        fetch('http://email.api/send', {
          method: 'POST',
          body: JSON.stringify({ to: u.em, msg: 'Você pegou ' + book.t })
        }).then(r => { /* nada */ }).catch(e => {});
      }
    } else if (action === 'return') {
      for (var k = 0; k < this.lns.length; k++) {
        if (this.lns[k].uid === userId && this.lns[k].bt === book.t && this.lns[k].st === 1) {
          this.lns[k].st = 2;  // SMELL: Magic Numbers
          for (var m = 0; m < this.bks.length; m++) {
            if (this.bks[m].t === book.t) { this.bks[m].cp = this.bks[m].cp + 1; }
          }
        }
      }
    } else if (action === 'overdue') {
      for (var n = 0; n < this.lns.length; n++) {
        var diff = (new Date() - this.lns[n].d) / (1000 * 60 * 60 * 24); // SMELL: Magic Numbers
        if (this.lns[n].st === 1 && diff > 7) {
          this.lns[n].st = 3; // SMELL: Magic Numbers
          var usr = null;
          for (var p = 0; p < this.us.length; p++) {
            if (this.us[p].id === this.lns[n].uid) { usr = this.us[p]; }
          }
          if (usr) {
            fetch('http://email.api/send', { // SMELL: Duplicated Code
              method: 'POST',
              body: JSON.stringify({ to: usr.em, msg: 'Atrasado: ' + this.lns[n].bt })
            });
          }
        }
      }
    }
  }

  registerUser(n, e, ph, addr, cty, st, zp, isAdm) {  // SMELL: Long Parameter List 
    this.us.push({ id: this.us.length + 1, n: n, em: e, ph: ph, addr: addr, cty: cty, st: st, zp: zp, isAdm: isAdm });
  }

  report(type) {  // SMELL: Switch sobre tipo (encandeamento de ifs)
    if (type === 1) { 
      console.log('Total de livros: ' + this.bks.length);
    } else if (type === 2) {
      console.log('Total de usuários: ' + this.us.length);
    } else if (type === 3) {
      console.log('Total de empréstimos: ' + this.lns.length);
    }
  }
}

// Uso:
const lib = new Library();
lib.registerUser('Ana', 'ana@uepb.edu.br', '83999990000', 'Rua X, 10', 'Patos', 'PB', '58700-000', false);
lib.doStuff({ t: 'Clean Code', cp: 3 }, null, 'add');
lib.doStuff({ t: 'Clean Code' }, 1, 'lend');
lib.report(1);
