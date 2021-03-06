import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';
import 'rxjs/add/operator/map';

@Injectable()
export class ExercicioDaoProvider {

  constructor(private dbProvider: DatabaseProvider) {  }
 
  public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from exercicios where id = ?';
        let data = [id];
 
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
  
  public getUser(treino_id: number, intensity: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT id, nome, IMG FROM exercicios where treino_id = ? and intensity=?';
        let data = [treino_id, intensity];
 
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
 
  public getAll(treino_id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT id, nome, IMG FROM exercicios where treino_id = ?';
        var data = [treino_id];
 
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let exercicios: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var exercicio = data.rows.item(i);
                exercicios.push(exercicio);
              }
              console.log(exercicios);
              
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
