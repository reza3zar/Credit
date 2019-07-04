import * as moment from 'jalali-moment';
export class ExtendCredit{

  public creditId: number;

 public newDueTime:Date;

 public description: string


public  letterNo : string


private _dueDateMoment : moment.Moment;
public get dueDateMoment() : moment.Moment {
  return this._dueDateMoment;
}
public set dueDateMoment(v : moment.Moment) {
  if(v===undefined )return
  this.newDueTime=new Date((moment.from(v.toString() +' 12:00:00', 'fa', 'YYYY/MM/DD HH:mm:ss').format('YYYY/MM/DD HH:mm:ss')))

  this._dueDateMoment = v;
}



}
