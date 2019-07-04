import { AddCreditDecider } from './../../Models/Credit/AddCreditDecider';
import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../model/category';
import { Broker } from '../../Models/Misc/Broker';
import { Customer } from '../../Models/Misc/Customer';

@Component({
  selector: 'app-add-bond',
  templateUrl: './add-bond.component.html',
  styleUrls: ['./add-bond.component.css']
})
export class AddBondComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() category :Category;
  @Input() broker :Broker;
  @Input() customer :Customer;

}
