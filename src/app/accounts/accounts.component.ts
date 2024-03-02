import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AccountService} from "../services/account.service";
import {catchError, Observable, throwError} from "rxjs";
import {AccountDetails} from "../model/account.model";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit{

  currentPage : number =0;
  pageSize : number=5;
  accountFormGroup!: FormGroup;
  account$! : Observable<AccountDetails>;
  operationFormGroup! : FormGroup;
  errorMessage!:string;
  constructor(private fb: FormBuilder, private accountService: AccountService) {
  }


  ngOnInit(): void {

    this.accountFormGroup=this.fb.group({
       accountId: this.fb.control('')
    });

    this.operationFormGroup=this.fb.group({
      operationType:this.fb.control(null),
      amount: this.fb.control(0),
      description : this.fb.control(null),
      accountDestination: this.fb.control(null)
    })

  }


  handleSearchAccount() {
    let accountId=this.accountFormGroup.value.accountId;
    this.account$=this.accountService.getAccount(accountId,this.currentPage,this.pageSize).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err );
      })
    );

  }

  goToPage(page: number) {
    this.currentPage=page;
    this.handleSearchAccount();

  }

  handleAccountOperation() {
    let accountId:string = this.accountFormGroup.value.accountId;
    let accountDestination:string = this.operationFormGroup.value.accountDestination;
    let amount:number = this.operationFormGroup.value.amount;
    let description:string = this.operationFormGroup.value.description;

    let operationType=this.operationFormGroup.value.operationType;

    if(operationType=='DEBIT'){
      this.accountService.debit(accountId,amount,description).subscribe({
        next:(data)=>{
          alert("Success Debit");
          this.handleSearchAccount();
        },
        error:(err)  => {
          console.log(err);
        }
      });

    }else if(operationType=='CREDIT'){
      this.accountService.credit(accountId,amount,description).subscribe({
        next:(data)=>{
          alert("Success Credit ");
          this.handleSearchAccount();
        },
        error:(err)  => {
          console.log(err);
        }
      });

    }else if(operationType=='TRANSFER'){
      this.accountService.transfer(accountId,accountDestination,amount,description).subscribe({
        next:(data)=>{
          alert("Success Debit");
          this.handleSearchAccount();
        },
        error:(err)  => {
          console.log(err);
        }
      });

    }
    this.operationFormGroup.reset();

  }
}
