import { Component, OnInit, Input } from '@angular/core';
import { AddCreditDecider } from '../../Models/Credit/AddCreditDecider';
import { Category } from '../../model/category';
import { Broker } from '../../Models/Misc/Broker';
import { Customer } from '../../Models/Misc/Customer';

@Component({
  selector: 'app-add-check',
  templateUrl: './add-check.component.html',
  styleUrls: ['./add-check.component.css']
})
export class AddCheckComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  @Input() category :Category;
  @Input() broker :Broker;
  @Input() customer :Customer;
}
