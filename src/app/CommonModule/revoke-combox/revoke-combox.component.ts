import {  OnInit, forwardRef, Component, OnDestroy } from "@angular/core";
import { NG_VALUE_ACCESSOR} from "@angular/forms";
import { BankServiceService } from "../../services/bank-service.service";
import { ComboItem } from "../../Models/System/comboItem";
import { Subscription } from "rxjs";
import { CreditRevocationReasonCollection } from "../../Models/Credit/CreditRevocationReason";

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RevokeComboxComponent),
  multi: true
};

const noop = () => {};

@Component({
  selector: 'app-revoke-combox',
  templateUrl: './revoke-combox.component.html',
  styleUrls: ['./revoke-combox.component.css'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class RevokeComboxComponent implements OnInit , OnDestroy{

  public revokeCollection:Array<CreditRevocationReasonCollection>=new Array<CreditRevocationReasonCollection>();
  public creditRevocationReasonCollection=new CreditRevocationReasonCollection();

  public dataBanks: Array<{ name: string; value: number }> = [];
  public static banksCollection = [];

  constructor() { }

  ngOnInit() {
    if (RevokeComboxComponent.banksCollection.length <= 0)
    this.getBanksCollection();
  else this.dataBanks = RevokeComboxComponent.banksCollection;
  }

  localSubscriber:Subscription;
  ngOnDestroy() {
    if (this.localSubscriber !== undefined) {
      this.localSubscriber.unsubscribe();
    }
}

  getBanksCollection() {
      let data=this.creditRevocationReasonCollection.gteCollection();

      RevokeComboxComponent.banksCollection = data.slice();
      this.dataBanks = RevokeComboxComponent.banksCollection;

  }

  handleFilterBanks(value) {
    this.dataBanks = RevokeComboxComponent.banksCollection.filter(
      s => s.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
    );
  }
 //The internal data model

 private innerValue: ComboItem = new ComboItem();

 //Placeholders for the callbacks which are later providesd
 //by the Control Value Accessor
 private onTouchedCallback: () => void = noop;
 private onChangeCallback: (_: any) => void = noop;

 //get accessor
 get value(): any {
   return this.innerValue.value;
 }

 //set accessor including call the onchange callback
 set value(v: any) {
   if (v !== this.innerValue) {
     this.innerValue.value = v;
     this.onChangeCallback(v);
   }
 }

 //Set touched on blur
 onBlur() {
   this.onTouchedCallback();
 }

 //From ControlValueAccessor interface
 writeValue(value: any) {
   if (value !== this.innerValue.value) {
     this.innerValue.value = value;
   }
 }

 //From ControlValueAccessor interface
 registerOnChange(fn: any) {
   this.onChangeCallback = fn;
 }

 //From ControlValueAccessor interface
 registerOnTouched(fn: any) {
   this.onTouchedCallback = fn;
 }
}
