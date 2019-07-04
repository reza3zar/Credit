import { Guarantee } from './Guarantee';
import { OrderSide } from './OrderSide';
import { GuaranteeType } from './GuaranteeType';
import { OrderStatus } from './OrderStatus';
import { Trade } from './Trade';

    export class Order {
        public orderId: number;
        public userId: string;
        public customerId: number;
        public brokerId: number;
        public guarantee: Guarantee;
        public creationTime: Date;
        public modificationTime: Date;
        public orderSide: OrderSide;
        public symbol: string;
        public value: number;
        public surplus: number;
        public guaranteeCoefficient: number;
        public guaranteeType: GuaranteeType;
        public guaranteeTypeString: string;

        public status: OrderStatus;
        public statusString: string;
        public supplyDate: Date;
        public deliveryDate: Date;
        public deliveryDateString: string;
        public privilegedToUseBrokerCredit: boolean;
        public privilegedToUseFormalLetterCredit: boolean;
        public privilegedToUseBrokerCreditString: string;
        public privilegedToUseFormalLetterCreditString: string;

        public trades: Array<Trade>;
        public guaranteeHistory: Array <Guarantee>;

        public colorString:string;
        public supplyDateString: string;

    }
