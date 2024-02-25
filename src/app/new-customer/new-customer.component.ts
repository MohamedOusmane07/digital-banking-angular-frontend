import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Customer} from "../model/customer.model";
import {CustomerService} from "../services/customer.service";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.css'
})


export class NewCustomerComponent implements OnInit{
newCustomerFormGroup!: FormGroup;
  constructor(private fb : FormBuilder, private customerService: CustomerService) {
  }

  ngOnInit() {
    this.newCustomerFormGroup=this.fb.group({
      lastName :this.fb.control(null,[Validators.required,Validators.minLength(4)]),
      firstName :this.fb.control(null,[Validators.required,Validators.minLength(4)]),
      email: this.fb.control(null,[Validators.required,Validators.email])
    });
  }

  handleSaveCustomer() {
    let customer :Customer=this.newCustomerFormGroup.value;
    this.customerService.saveCustomer(customer).subscribe({
      next : data =>{
        alert("Customer has been successfuly saved");
      },
      error:err=>{
         console.log(err);
      }
    });


  }
}