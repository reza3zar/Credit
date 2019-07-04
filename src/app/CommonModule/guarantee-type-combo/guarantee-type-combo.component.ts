import { OrdersService } from './../../services/orders.service';
import { Component, OnInit, forwardRef, Input, OnDestroy } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { ComboItem } from "../../Models/System/comboItem";
import { Subscription } from "rxjs";
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => GuaranteeTypeComboComponent),
  multi: true
};

const noop = () => {};

@Component({
  selector: 'app-guarantee-type-combo',
  templateUrl: './guarantee-type-combo.component.html',
  styleUrls: ['./guarantee-type-combo.component.css'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class GuaranteeTypeComboComponent implements OnInit, OnDestroy {
  public dataguarantees: Array<{ name: string; value: number }> = [];
  public static guaranteesCollection = [];

  @Input() disabled: boolean = false;

  constructor(private orderService: OrdersService) {}

  ngOnInit() {
    if (GuaranteeTypeComboComponent.guaranteesCollection.length <= 0)
      this.getguaranteesCollection();
    else this.dataguarantees = GuaranteeTypeComboComponent.guaranteesCollection;
  }
  localSubscriber: Subscription;
  ngOnDestroy() {
    if (this.localSubscriber !== undefined) {
      this.localSubscriber.unsubscribe();
    }
  }
  getguaranteesCollection() {
    this.localSubscriber = this.orderService.getGuarantyee().subscribe(data => {
      GuaranteeTypeComboComponent.guaranteesCollection = data.slice();
      this.dataguarantees = GuaranteeTypeComboComponent.guaranteesCollection;
    });
  }

  handleFilterguarantees(value) {
    this.dataguarantees = GuaranteeTypeComboComponent.guaranteesCollection.filter(
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
