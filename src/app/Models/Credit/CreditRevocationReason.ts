    export enum CreditRevocationReason {
        /// <summary>
        /// تعویض ضمانت
        /// </summary>
        Replacement = 1,

        /// <summary>
        /// نقد شدن ضمانت
        /// Release
        /// </summary>
        Cashed = 2,

        /// <summary>
        /// انقضای تاریخ سررسید
        /// </summary>
        Expired = 3,

        /// <summary>
        /// ابطال شده
        /// </summary>
        Canceled = 4,

        Other = 5
    }

    export   class CreditRevocationReasonCollection{
      public id:number;
      public name:string;

       gteCollection():Array<CreditRevocationReasonCollection>{
       var list=new Array<CreditRevocationReasonCollection>();
       var item=new CreditRevocationReasonCollection();
        item.id=1;
        item.name='تعویض ضمانت';
        list.push( item)

       var item2=new CreditRevocationReasonCollection();
        item2.id=2;
        item2.name='نقد شدن ضمانت';
        list.push( item2);

       var item3=new CreditRevocationReasonCollection();
        item3.id=3;
        item3.name='انقضای تاریخ سررسید ';
        list.push( item3)

       var item4=new CreditRevocationReasonCollection();
        item4.id=4;
        item4.name='ابطال شده';
        list.push( item4);

       var item5=new CreditRevocationReasonCollection();
        item5.id=5;
        item5.name='سایر';
        list.push( item5)

        return list;
       }


    }
