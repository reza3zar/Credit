import { GuaranteeType } from './GuaranteeType';

    export class TemporaryOrderDTO {
      /**
       *
       */
      constructor() {
        this._privilegedToUseBrokerCredit=false;

      }
        public customerId: number;
        public brokerId: number;
        public guaranteeType: GuaranteeType;
        public guaranteeTypeValue: number;
        public value: number;
        public guaranteeCoefficient: number;



        private privilegedToUseBrokerCredit:boolean = false;
        get _privilegedToUseBrokerCredit():boolean {
            return this.privilegedToUseBrokerCredit;
        }
        set _privilegedToUseBrokerCredit(value:boolean) {


          if(value==undefined){

            value=false;
            this.privilegedToUseBrokerCredit = false;


          }
          else
            this.privilegedToUseBrokerCredit = value;
        }

        private privilegedToUseLetterCredit:boolean = false;
        get _privilegedToUseLetterCredit():boolean {

            return this.privilegedToUseLetterCredit;
        }
        set _privilegedToUseLetterCredit(value:boolean) {


          if(value==undefined){
            value=false;
            this.privilegedToUseLetterCredit=false;
          }
          else

            this.privilegedToUseLetterCredit = value;
        }

    }
