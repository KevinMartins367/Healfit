export class Evento {
  constructor(public id: number,
              public title: string,
              public startTime: string,
              public endTime: string,
              public allDay: boolean,
              public notification: string) { }
}
