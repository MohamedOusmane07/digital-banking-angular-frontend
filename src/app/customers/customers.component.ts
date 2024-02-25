import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CustomerService} from "../services/customer.service";
import {catchError, Observable, throwError} from "rxjs";
import {Customer} from "../model/customer.model";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent  implements OnInit{
  customers! : Observable<Array<Customer>>;
  errorMessage! : string;
  searchFormGroup : FormGroup|undefined;

  //On injecte le service HttpClient au niveau du constructeur
  constructor(private customerService : CustomerService, private fb : FormBuilder ) {
  }

  //La méthode qui s'exécute au démarrage, c'est-à-dire au moment du chargement du composant
  ngOnInit() {
    this.searchFormGroup=this.fb.group({
      keyword: this.fb.control("")
    });
this.handleSearchCustomers();
  }

  handleSearchCustomers() {
    let kw=this.searchFormGroup?.value.keyword;
    this.customers=this.customerService.searchCustomers(kw).pipe(
      catchError(err => {
        this.errorMessage=err.message;
        return throwError(err);
      })
    )

  }
}
