import { Customer } from "../Misc/Customer";
import { FormalLetterStatus } from "./FormalLetterStatus";
import * as moment from 'jalali-moment';

    export class FormalLetter {
        /**
         *
         */
        constructor() {

        }

        public id: number;
        public customer: Customer;
        public creatorId: string;
        public modifierId: string;
        public creationTime: Date;
        public modificationTime: Date;
        public status: FormalLetterStatus;
        public ceilingAmount: number;
        public issueDateString: string;
        public letterNo: string;
        public letterDescription: string;





        private issueDate : Date;
        public get _issueDate() : Date {
          return this.issueDate;
        }
        public set _issueDate(v : Date) {

          if(v===undefined )return
          this._issueDateMoment=moment(v);
          this.issueDate = v;

        }

        private _issueDateMoment : moment.Moment;
        public get issueDateMoment() : moment.Moment {
          return this._issueDateMoment;
        }
        public set issueDateMoment(v : moment.Moment) {
          if(v===undefined )return


          this.issueDate=new Date((moment.from(v.toString() +' 12:00:00', 'fa', 'YYYY/MM/DD HH:mm:ss').format('YYYY/MM/DD HH:mm:ss')))

          this._issueDateMoment = v;
        }




        private letterDate : Date;
        public get _letterDate() : Date {
          return this.letterDate;
        }
        public set _letterDate(v : Date) {

          if(v===undefined )return
          this._letterDateMoment=moment(v);
          this.letterDate = v;

        }

        private _letterDateMoment : moment.Moment;
        public get letterDateMoment() : moment.Moment {
          return this._letterDateMoment;
        }
        public set letterDateMoment(v : moment.Moment) {
          if(v===undefined )return
          this.letterDate=new Date((moment.from(v.toString() +' 12:00:00', 'fa', 'YYYY/MM/DD HH:mm:ss').format('YYYY/MM/DD HH:mm:ss')))
          this._letterDateMoment = v;
        }


        private dueDate : Date;
        public get _dueDate() : Date {
          return this.dueDate;
        }
        public set _dueDate(v : Date) {

          if(v===undefined )return
          this._dueDateMoment=moment(v);
          this.dueDate = v;

        }

        private _dueDateMoment : moment.Moment;
        public get dueDateMoment() : moment.Moment {
          return this._dueDateMoment;
        }
        public set dueDateMoment(v : moment.Moment) {
          if(v===undefined )return
          this.dueDate=new Date((moment.from(v.toString() +' 12:00:00', 'fa', 'YYYY/MM/DD HH:mm:ss').format('YYYY/MM/DD HH:mm:ss')))
          this._dueDateMoment = v;
        }

        public creator: string;
        public modifier: string;

    }
