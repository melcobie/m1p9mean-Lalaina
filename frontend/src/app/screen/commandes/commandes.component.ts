import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommandeService } from 'src/app/helper/commande-service';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.scss'],
  providers: [DatePipe]
})
export class CommandesComponent implements OnInit {
  commandes: any[] = [];
  loader: boolean = false;
  noData: boolean = false;

  error = "";

  constructor(
    private service: CommandeService,
    private datePipe: DatePipe,
    private router: Router,
  ) { 
    
  }

  ngOnInit(): void {
    this.loader = true;
    this.service.getCommandesNotDelivered(localStorage.getItem("token")||"")
      .subscribe((data: any) => {
        this.commandes = data;
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

}
