﻿import { CreditType } from './CreditType';
import { CreditOwnerType } from './CreditOwnerType';
import { CreditCategory } from './CreditCategory';
import { Bank } from '../Misc/Bank';
import { CreditStatus } from './CreditStatus';
import { CreditRevocation } from './CreditRevocation';
import { CreditExtension } from './CreditExtension';
import * as moment from 'jalali-moment';
import { CreditHistory } from './Credithistory';


    export class Credit {
        constructor(){
          this.dueDate=new Date();
          this.issueDate=new Date();

          this.creationTime=new Date();
          this.bank=new Bank();
        }

        public type: CreditType;
        public ownerType: CreditOwnerType;
        public id: number;
        public creatorId: string;
        public modifierId: string;
        public creator: string;
        public modifier: string;
        public category: CreditCategory;
        public bank: Bank;
        public creationTime: Date;
        public modificationTime: Date;
        public status: CreditStatus;
        public statusString: string;

        public creditNumber: string;
        public principal: string;
        public value: number;
        // public issueDate: Date;
        // public dueDate: Date;
        public branchCode: string;
        public branchName: string;
        public description: string;
        public revocation: CreditRevocation;
        public extensions: Array<CreditExtension>;
        public  dueDateString: string;
        public  issueDateString: string;
        public  creationTimeString: string;

        private issueDate : Date;
        public get _issueDate() : Date {
          return this.issueDate;
        }
        public set _issueDate(v : Date) {
          if(v===undefined )return
          this._isueDateMoment=moment(v);

          this.issueDate = v;
        }

        private _isueDateMoment : moment.Moment;
        public get isueDateMoment() : moment.Moment {
          return this._isueDateMoment;
        }
        public set isueDateMoment(v : moment.Moment) {
          if(v===undefined )return


          this.issueDate=new Date((moment.from(v.toString() +' 12:00:00', 'fa', 'YYYY/MM/DD HH:mm:ss').format('YYYY/MM/DD HH:mm:ss')))
          this._isueDateMoment = v;
        }

        public history:CreditHistory[];


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

        public colorString:string;

    }
