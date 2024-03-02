import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Customer} from "../model/customer.model";
import {AccountService} from "../services/account.service";
import {catchError, Observable, throwError} from "rxjs";
import {BankAccountDTO} from "../model/customerAccount";

@Component({
  selector: 'app-customer-acounts',
  templateUrl: './customer-acounts.component.html',
  styleUrl: './customer-acounts.component.css'
})
export class CustomerAcountsComponent implements OnInit{

  customerId!:number;
  customer!:Customer;
  accountDTO!:Observable<Array<BankAccountDTO>>;
  errorMessage!:string;

  constructor(private route:ActivatedRoute, private router:Router,private accountService:AccountService) {
    this.customer=this.router.getCurrentNavigation()?.extras.state as Customer;
  }

  ngOnInit() {
    this.customerId=this.route.snapshot.params['id'];
    this.accountDTO=this.accountService.customerAccount(this.customerId).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);

      })
    );

  }



}
