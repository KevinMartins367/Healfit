import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';
import { Peso } from '../peso-local/peso-local';
import 'rxjs/add/operator/map';

@Injectable()
export class PesoDaoProvider {

  constructor(private dbProvider: DatabaseProvider) {  }

  public insert(p: Peso) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into pesos (atual, data, meta, cliente_id) values (?, ?, ?, ?)';
        let data = [p.atual, p.data, p.meta, p.cliente_id];
 
        return db.executeSql(sql, data)
          .then((data: any) => {return true;})
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public update(p: Peso) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update pesos set atual = ?, data = ?, meta = ? where id = ?';
        let data = [p.atual, p.data, p.meta, p.id];
 
        return db.executeSql(sql, data)
          .then((data: any) => {return true;})
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
  
  public getAll() {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT id, atual, data, meta FROM pesos';
        var data: any[];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let pesos: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var peso = data.rows.item(i);
                pesos.push(peso);
              }
              
              return pesos;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from pesos where id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .then((data: any) => {return true;})
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
  
}
