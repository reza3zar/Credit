import * as moment from 'jalali-moment';

export class TradeSearch{
  public customerId:number;
  public orderGuaranteeType:number=1;
  public supplyDate:DatePeriod;
  public deliveryDate:DatePeriod;
}

export class DatePeriod{

  private from : Date;
  public get _from() : Date {
    return this.from;
  }
  public set _from(v : Date) {

    if(v===undefined )return
    this._fromDateMoment=moment(v);
    this.from = v;

  }

  private _fromDateMoment : moment.Moment;
  public get fromDateMoment() : moment.Moment {
    return this._fromDateMoment;
  }
  public set fromDateMoment(v : moment.Moment) {
    if(v===undefined )return
    this.from=new Date((moment.from(v.toString() +' 12:00:00', 'fa', 'YYYY/MM/DD HH:mm:ss').format('YYYY/MM/DD HH:mm:ss')))
    this._fromDateMoment = v;
  }

  private to : Date;
  public get _to() : Date {
    return this.to;
  }
  public set _to(v : Date) {

    if(v===undefined )return
    this._toDateMoment=moment(v);
    this.to = v;

  }

  private _toDateMoment : moment.Moment;
  public get toDateMoment() : moment.Moment {
    return this._toDateMoment;
  }
  public set toDateMoment(v : moment.Moment) {
    if(v===undefined )return
    this.to=new Date((moment.from(v.toString() +' 12:00:00', 'fa', 'YYYY/MM/DD HH:mm:ss').format('YYYY/MM/DD HH:mm:ss')))
    this._toDateMoment = v;
  }

}


