import { FormalLetter } from './../../Models/Credit/FormalLetter';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '@progress/kendo-angular-notification';
import { LetterService } from '../../services/letter.service';
import { SidebarService } from '../../SlideInOutModule/sidebar.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-letter',
  templateUrl: './add-letter.component.html',
  styleUrls: ['./add-letter.component.css']
})
export class AddLetterComponent implements OnInit {
  public formalLetter:FormalLetter=new FormalLetter();
  creditForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder,private letterService:LetterService,
    private notificationService: NotificationService,private sideBarServices:SidebarService) {}

  ngOnInit() {
    this.creditForm = this.formBuilder.group({
      creditNumber: ['', Validators.required],
      value: ['', ],
      dueDate: ['' ],
      issueDate: [''],
      // letterDate: ['', [Validators.required ]],
      description: [''],
      customer: ['', [Validators.required ]],
  });
  }

  sendDataToServer=false;

  @Output() creditChanged :EventEmitter<boolean>   = new EventEmitter();;

  creditServiceSubscriber: Subscription;
  ngOnDestroy(): void {


    if (this.creditServiceSubscriber !== undefined) {
      this.creditServiceSubscriber.unsubscribe();
    }
  }

  get ctrl() { return this.creditForm.controls; }
  onSubmit() {
    this.submitted = true;

    this.creditForm.controls['issueDate'].setErrors(null);
    this.creditForm.controls['dueDate'].setErrors(null);

    if (this.creditForm.invalid|| this.sendDataToServer==true)  {
      return;
  }
  this.sendDataToServer=true;


  this.creditServiceSubscriber= this.letterService.addLetter(this.formalLetter).subscribe(result=>{
     if(result==true)
     {
       this.creditChanged.emit(true);
       this.showNotifySuccessAddWarranty('');
       this.sideBarServices.toggle('out');
       this.sendDataToServer=false;
     }

   },err=>{
     this.showError(err);
     this.sendDataToServer=false;

   })

  }

  public cancelNewRecord(){
    this.sideBarServices.toggle('out');
  }

  public showNotifySuccessAddWarranty(da): void {
    this.notificationService.show({
      content: "عملیات با موفقیت صورت پذیرفت",
      height:40,
      animation: { type: "fade", duration: 1000 },
      position: { horizontal: "center", vertical: "top" },
      type: { style: "success", icon: true },
      closable: false
    });
  }

  public showError(err: any): void {

    this.notificationService.show({
      content:
      err.error.message,


      height:40,
      animation: { type: "fade", duration: 1000 },
      position: { horizontal: "center", vertical: "top" },
      type: { style: "error" },
      closable: true
    });
  }

}
