import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {AccountDetails} from "../model/account.model";
import * as http from "http";
import {BankAccountDTO} from "../model/customerAccount";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  public getAccount(accountId : String, page:number, size: number ):Observable<AccountDetails>{
    return this.http.get<AccountDetails>(environment.backendHost+"/accounts/"+accountId+"/pageOperations?page="+page+"&size="+size);
  }


  public debit(accountId:string, amount:number, description:string){
    let data={accountId:accountId,amount:amount,description:description}
    return this.http.post(environment.backendHost+"/accounts/debit",data);
  }

  public credit(accountId:string, amount:number, description:string){
    let data={accountId:accountId,amount:amount,description:description}
    return this.http.post(environment.backendHost+"/accounts/credit",data);
  }

  public transfetr(accountId:string, accountIdDest:string,amount:number, description:string){
    let data={accountIdSource:accountId,accountIdDestination:accountIdDest,amount:amount,description:description};
    return this.http.post(environment.backendHost+"/accounts/transfert",data);
  }

  public transfer(accountId:string,accountIdDest:string, amount:number, description:string){
    let data={accountIdSource:accountId,accountIdDestination:accountIdDest,amount:amount,description:description}
    return this.http.post(environment.backendHost+"/accounts/transfer",data);
  }

  public customerAccount(customerId:number):Observable<Array<BankAccountDTO>>{
    return this.http.get<Array<BankAccountDTO>>(environment.backendHost+"/accounts/customer/"+customerId);
  }

}
