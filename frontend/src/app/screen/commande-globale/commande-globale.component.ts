import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommandeService } from 'src/app/helper/commande-service';

@Component({
  selector: 'app-commande-globale',
  templateUrl: './commande-globale.component.html',
  styleUrls: ['./commande-globale.component.scss'],
  providers: [DatePipe]
})
export class CommandeGlobaleComponent implements OnInit {
  commandes: any[] = [];
  loader: boolean = false;
  noData: boolean = false;

  error = "";

  delivered: boolean = false;

  constructor(
    private service: CommandeService,
    private datePipe: DatePipe,
    private router: Router,
  ) { 
  }

  ngOnInit(): void {
    this.loader = true;
    this.service.getCommandes(
      { "etatLivraison.delivered": this.delivered },
      localStorage.getItem("token")||""
    ).subscribe((data: any) => {
        this.commandes = data;
        this.noData = false;
        if(data.length < 1) this.noData = true;
        this.loader = false;
      }, err => {
        this.loader = false;
        this.noData = true;
      })
  }

  date(date: any){
    return this.datePipe.transform(date, "dd-MM-yyyy hh:mm");
  }

  goToDetails(id:string){
    this.router.navigateByUrl("/commande/"+id);
  }

  handle(delivered: boolean){
    if(delivered === this.delivered) return;
    this.delivered = delivered;
    this.loader = true;
    this.service.getCommandes(
      { "etatLivraison.delivered": this.delivered },
      localStorage.getItem("token")||""
    ).subscribe((data: any) => {
        this.commandes = data;
        this.noData = false;
        if(data.length < 1) this.noData = true;
        this.loader = false;
      }, err => {
        this.loader = false;
        this.noData = true;
      })
  }

}
