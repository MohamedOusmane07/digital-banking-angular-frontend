import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent  implements OnInit{
  customers : any;

  //On injecte le service HttpClient au niveau du constructeur
  constructor(private http: HttpClient) {
  }

  //La méthode qui s'exécute au démarrage, c'est-à-dire au moment du chargement du composant
  ngOnInit() {
    this.http.get("http://localhost:8085/customers").subscribe(data=>{
        this.customers=data;
    },error => {
      console.log(error);
    })
  }
}
