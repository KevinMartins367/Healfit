import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { sha3_512 } from 'js-sha3';

@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) {  }

  public getDB() {
    return this.sqlite.create({
      name: 'infocli.db',
      location: 'default'
    });
  }

  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {
 
        // Criando as tabelas
        this.createTables(db);
 
        // Inserindo dados padrão
        this.insertDefaultItems(db);
 
      })
      .catch(e => console.log(e));
  }


  private createTables(db: SQLiteObject) {
    // Criando as tabelas
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS clientes (id integer primary key AUTOINCREMENT NOT NULL, email TEXT, password TEXT, altura REAL(3,2), pack_Exc TEXT, user_id integer, pessoa_id integer, api_token TEXT)'],
      ['CREATE TABLE IF NOT EXISTS exercicios (id integer primary key AUTOINCREMENT NOT NULL, nome TEXT, IMG TEXT, descricao TEXT, periodo TEXT, duracao TEXT, link TEXT, user_id integer)'],
      ['CREATE TABLE IF NOT EXISTS eventos (id integer primary key AUTOINCREMENT NOT NULL, title TEXT, startTime TEXT, endTime TEXT, allDay integer, notification TEXT)'],
      ['CREATE TABLE IF NOT EXISTS pesos (id integer primary key AUTOINCREMENT NOT NULL, atual REAL(5,2), data TEXT, meta REAL(5,2), cliente_id integer, FOREIGN KEY(cliente_id) REFERENCES clientes(id))'],
    ])
      .then(() => console.log('Tabelas criadas'))
      .catch(e => console.error('Erro ao criar as tabelas', e));
  }

  private insertDefaultItems(db: SQLiteObject) {
    db.executeSql('select COUNT(id) as qtd from exercicios', {})
    .then((data: any) => {
      //Se não existe nenhum registro
      if (data.rows.item(0).qtd == 0) {
 
        // Criando as tabelas
        db.sqlBatch([
          ['insert into exercicios (nome, IMG, descricao, periodo, duracao, link, user_id) values (?,?,?,?,?,?,?)', 
          ['corda','http://localhost:8000/imagens/source.gif','0', '1', '120', '0', '1']],
          ['insert into exercicios (nome, IMG, descricao, periodo, duracao, link, user_id) values (?,?,?,?,?,?,?)',  
          ['corrida','http://localhost:8000/imagens/','0', '1', '1800', '0', '1']],
          ['insert into exercicios (nome, IMG, descricao, periodo, duracao, link, user_id) values (?,?,?,?,?,?,?)',   
          ['Jab','http://localhost:8000/imagens/','Soco aplicado com o punho que está à frente da posição de guarda, geralmente usado para distrair o oponente, tomar distância ou abrir a guarda para desferir golpes mais potentes', '2', '120', '0', '1']],
          ['insert into exercicios (nome, IMG, descricao, periodo, duracao, link, user_id) values (?,?,?,?,?,?,?)',   
          ['tip','http://localhost:8000/imagens/','É o chute frontal com a perna que está à frente, geralmente usado para distanciar ou empurrar o oponente porém, se bem aplicado, pode também causar dor', '2', '120', '0', '1']],
          ['insert into exercicios (nome, IMG, descricao, periodo, duracao, link, user_id) values (?,?,?,?,?,?,?)',   
          ['Chute lateral','http://localhost:8000/imagens/','Como o próprio nome já diz, o este chute virá das laterais, podendo atingir tanto as pernas, como região abdominal e cabeça', '2', '120', '0', '1']],
          ['insert into exercicios (nome, IMG, descricao, periodo, duracao, link, user_id) values (?,?,?,?,?,?,?)',   
          ['Joelhada','http://localhost:8000/imagens/','A joelhada é outro golpe típico do Muay Thai e também extremamente poderoso, podendo causar sérias lesões se bem aplicados', '2', '120', '0', '1']],
          ['insert into exercicios (nome, IMG, descricao, periodo, duracao, link, user_id) values (?,?,?,?,?,?,?)',   
          ['Cotovelada','http://localhost:8000/imagens/','É um golpe em que se atinge o oponente com seus cotovelos e ela pode ser aplicada de forma lateral ou de forma frontal, geralmente atingindo o queixo ou nariz do oponente', '2', '120', '0', '1']],
          ['insert into exercicios (nome, IMG, descricao, periodo, duracao, link, user_id) values (?,?,?,?,?,?,?)',   
          ['abdominal','http://localhost:8000/imagens/','0', '2', '60', '0', '1']],
          ['insert into exercicios (nome, IMG, descricao, periodo, duracao, link, user_id) values (?,?,?,?,?,?,?)',   
          ['prancha','http://localhost:8000/imagens/','0', '2', '120', '0', '1']],
          ['insert into exercicios (nome, IMG, descricao, periodo, duracao, link, user_id) values (?,?,?,?,?,?,?)',   
          ['flexão','http://localhost:8000/imagens/','0', '2', '120', '0', '1']],
          ['insert into exercicios (nome, IMG, descricao, periodo, duracao, link, user_id) values (?,?,?,?,?,?,?)',   
          ['Cruzado','http://localhost:8000/imagens/','O cruzado é um soco aplicado com ambos os braços, então podendo ser cruzado direito ou cruzado esquerdo. É desferido de forma que o punho faça uma rota circular até atingir o oponente, podendo atingir tanto cabeça quanto costelas', '2', '120', '0', '1']],
          ['insert into exercicios (nome, IMG, descricao, periodo, duracao, link, user_id) values (?,?,?,?,?,?,?)',   
          ['Upper','http://localhost:8000/imagens/','Também conhecido no Brasil como “gancho”, o Upper é aplicado de baixo para cima, geralmente atingindo o queixo do oponente', '2', '120', '0', '1']],
          ['insert into exercicios (nome, IMG, descricao, periodo, duracao, link, user_id) values (?,?,?,?,?,?,?)',   
          ['ThaiTip','http://localhost:8000/imagens/','É o chute frontal aplicado com a perna que está atrás, este aplicado com a intenção de atingir o adversário com maior agressividade', '2', '120', '0', '1']],
          ['insert into exercicios (nome, IMG, descricao, periodo, duracao, link, user_id) values (?,?,?,?,?,?,?)',   
          ['Direto','http://localhost:8000/imagens/','Soco aplicado com o punho que está atrás, na posição de guarda. É um golpe mais agressivo e pode facilmente ferir ou levar o oponente a nocaute', '2', '120', '0', '1']]
        ])
          .then(() => console.log('Dados padrões incluídos'))
          .catch(e => console.error('Erro ao incluir dados padrões', e));
 
      }
    })
    .catch(e => console.error('Erro ao consultar a qtd de exercicios', e));

    db.executeSql('select COUNT(id) as qtd from clientes', {})
    .then((data: any) => {
      //Se não existe nenhum registro
      if (data.rows.item(0).qtd == 0) {
 
        // Criando as tabelas
        db.sqlBatch([
          ['insert into clientes (email, password, altura, pack_Exc, user_id, pessoa_id, api_token) values (?,?,?,?,?,?,?)', 
          ['teste@mail.com',sha3_512('12345'), '1.60','1#2#8#9', '1', '1', sha3_512('teste12345')]]
        ])
        .then(() => console.log('Dados padrões clientes incluídos '))
        .catch(e => console.error('Erro ao incluir dados padrões 2', e));

    }
  })
  .catch(e => console.error('Erro ao consultar a qtd de cliente', e));

  db.executeSql('select COUNT(id) as qtd from pesos', {})
  .then((data: any) => {
    //Se não existe nenhum registro
    if (data.rows.item(0).qtd == 0) {

      // Criando as tabelas
      db.sqlBatch([
        ['insert into pesos (atual, data, meta, cliente_id) values (?,?,?,?)', 
        [ 54, '04/01/2018', 60, 1]],
        ['insert into pesos (atual, data, meta, cliente_id) values (?,?,?,?)', 
        [ 56, '08/01/2018', 60, 1]]
      ])
      .then(() => console.log('Dados padrões pesos incluídos '))
      .catch(e => console.error('Erro ao incluir dados padrões 3', e));

  }
})
.catch(e => console.error('Erro ao consultar a qtd de cliente', e));
  }
}

