import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CommandeService } from 'src/app/helper/commande-service';
import { fileUrl } from 'src/app/helper/util';
import { AppState } from 'src/app/reducer';
import { Commande } from 'src/app/reducer/user-reducer/type';
import { userType } from 'src/app/widget/header/header.component';

@Component({
  selector: 'app-commande-details',
  templateUrl: './commande-details.component.html',
  styleUrls: ['./commande-details.component.scss'],
  providers: [DatePipe]
})
export class CommandeDetailsComponent implements OnInit {
  fileUrl = fileUrl

  commande: Commande = {
    plats: [],
    price: 0,
    costPrice: 0,
    addresse: "",
    etatLivraison: {
      delivered: false,
    }
  };
  addresse: string = "";

  isLivreur: boolean = false;

  constructor(
    private commandeService: CommandeService,
    private router: ActivatedRoute,
    private route: Router,
    private store: Store<AppState>,
    private datePipe: DatePipe,
  ) { 
    this.store.select("userState")
      .subscribe(user=> this.isLivreur = user.user?.type?.identifier === userType?.LIVREUR)
  }

  ngOnInit(): void {
    this.commandeService.getCommandeById(this.router.snapshot.paramMap.get("id")||"", localStorage.getItem("token")||"")
      .subscribe((data: any)=>{
        this.commande = data;
      });
  }

  livrer(){
    this.commandeService.deliver(this.router.snapshot.paramMap.get("id")||"", localStorage.getItem("token")||"")
      .subscribe(()=>{
        this.route.navigateByUrl("/livreur/commande")
      });
  }

  date(date: any){
    return this.datePipe.transform(date, "dd-MM-yyyy hh:mm");
  }
}
