import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'bazar.db');

const db = new DatabaseSync(dbPath);

db.exec('PRAGMA foreign_keys = ON;');

db.exec(`
  CREATE TABLE IF NOT EXISTS categorias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL UNIQUE,
    descricao TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    preco REAL NOT NULL,
    condicao TEXT NOT NULL,
    categoriaId INTEGER NOT NULL,
    FOREIGN KEY (categoriaId) REFERENCES categorias(id)
  );
`);

const { total } = db.prepare('SELECT COUNT(*) AS total FROM categorias').get();
if (total === 0) {
  db.prepare('INSERT INTO categorias (nome, descricao) VALUES (?, ?)').run(
    'Roupas',
    'Vestuário masculino, feminino e infantil'
  );
  db.prepare('INSERT INTO categorias (nome, descricao) VALUES (?, ?)').run(
    'Calçados',
    'Tênis, sapatos, sandálias e botas'
  );

  db.prepare(
    'INSERT INTO produtos (titulo, preco, condicao, categoriaId) VALUES (?, ?, ?, ?)'
  ).run('Jaqueta Jeans Vintage', 45.0, 'Usado - Bom', 1);

  db.prepare(
    'INSERT INTO produtos (titulo, preco, condicao, categoriaId) VALUES (?, ?, ?, ?)'
  ).run('Tênis Cano Alto', 60.0, 'Novo', 2);
}

export default db;