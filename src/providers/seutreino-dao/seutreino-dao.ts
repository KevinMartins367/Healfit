import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

@Injectable()
export class SeutreinoDaoProvider {

  constructor(private dbProvider: DatabaseProvider) {  }

  public get() {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from seutreinos where id = (SELECT MAX(id)  FROM seutreinos)';
        let data = [];
 
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let exercicios: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var exercicio = data.rows.item(i);
                exercicios.push(exercicio);
              }              
              return exercicios;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

}
