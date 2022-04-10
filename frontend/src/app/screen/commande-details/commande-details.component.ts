import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandeService } from 'src/app/helper/commande-service';
import { fileUrl } from 'src/app/helper/util';
import { Commande } from 'src/app/reducer/user-reducer/type';

@Component({
  selector: 'app-commande-details',
  templateUrl: './commande-details.component.html',
  styleUrls: ['./commande-details.component.scss']
})
export class CommandeDetailsComponent implements OnInit {
  fileUrl = fileUrl

  commande: Commande = {
    plats: [],
    price: 0,
    costPrice: 0,
    addresse: "",
  };
  addresse: string = "";

  constructor(
    private commandeService: CommandeService,
    private router: ActivatedRoute,
    private route: Router,
  ) { 
  
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
}
