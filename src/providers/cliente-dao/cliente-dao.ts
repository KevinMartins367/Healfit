import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';
import { sha3_512 } from 'js-sha3';

import { Cliente } from '../cliente-local/cliente-local';
import 'rxjs/add/operator/map';

@Injectable()
export class ClienteDaoProvider {

  constructor(private dbProvider: DatabaseProvider) {  }

  
  public updateIMC(cli: Cliente) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
      
        let sql = 'update Clientes set altura = ? where id = ?';
        let data = [cli.altura, cli.id];
  
        return db.executeSql(sql, data)
          .then((res: any) =>{
            return true;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  
  public updateInfo(cli: Cliente) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update Clientes set email = ?, password = ? where id = ?';
        let data = [cli.email, sha3_512(cli.password), cli.id];
 
        return db.executeSql(sql, data)
          .then((res: any) =>{
            return true;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from Clientes where id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let clientes: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var cliente = data.rows.item(i);
                clientes.push(cliente);
              }              
              return clientes;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public logout(cli: Cliente) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select id from Clientes where email = ? and password = ?';
        let data = [cli.email, cli.password];
 
        return db.executeSql(sql, data)
          .then((data: any) => {
            return data;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
}
