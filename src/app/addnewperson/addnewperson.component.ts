import { Component, OnInit } from '@angular/core';
import {SidebarService} from "../SlideInOutModule/sidebar.service";
class Person {
  constructor(public firstName: string = '',
              public lastName: string = '',) {
  }
}
@Component({
  selector: 'app-addnewperson',
  templateUrl: './addnewperson.component.html',
  styleUrls: ['./addnewperson.component.scss']
})



export class AddnewpersonComponent implements OnInit {
  powers = ['Really Smart', 'Super Flexible',
    'Super Hot', 'Weather Changer'];

  isloadPage=true;
  pers:Person;

  submitted = false;

  onSubmit() { this.submitted = true; }


  constructor( private sidebarService:SidebarService) {

  }

  ngOnInit() {

    this.pers=new Person();
  }


  onSave(){

  }

  cancel(){
    this.sidebarService.toggle('out');
  }

}
