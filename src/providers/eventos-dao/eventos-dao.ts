import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';
import { Evento } from '../evento-local/evento-local';
import 'rxjs/add/operator/map';

@Injectable()
export class EventosDaoProvider {

  constructor(private dbProvider: DatabaseProvider) {  }

  public insert(ev: Evento) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into eventos (title, startTime, endTime, allDay, notification) values (?, ?, ?, ?, ?)';
        let data = [ev.title, ev.startTime, ev.endTime, ev.allDay ? 1 : 0, ev.notification];
 
        return db.executeSql(sql, data)
          .then((data: any) => {return true;})
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public update(ev: Evento) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update eventos set title = ?, startTime = ?, endTime = ?, allDay = ?, notification = ? where id = ?';
        let data = [ev.title, ev.startTime, ev.endTime, ev.allDay ? 1 : 0, ev.notification, ev.id];
 
        return db.executeSql(sql, data)
          .then((data: any) => {return true;})
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public getAll() {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'SELECT id, title, startTime, endTime, allDay, notification FROM eventos';
        var data: any[];

        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let eventos: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var evento = data.rows.item(i);
                eventos.push(evento);
              }              
              return eventos;
            } else {
              return [];
            }
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }

  public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from eventos where id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let eventos: any[] = [];
              for (var i = 0; i < data.rows.length; i++) {
                var evento = data.rows.item(i);
                eventos.push(evento);
              }
              return eventos;
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
        let sql = 'delete from eventos where id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .then((data: any) => {return true;})
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
}
