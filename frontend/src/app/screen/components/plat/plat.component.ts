import { Component, Input, OnInit } from '@angular/core';
import { CommandeService } from 'src/app/helper/commande-service';
import { fileUrl } from 'src/app/helper/util';

@Component({
  selector: 'Plat',
  templateUrl: './plat.component.html',
  styleUrls: ['./plat.component.scss']
})
export class PlatComponent implements OnInit {
  @Input() plat: any;
  fileUrl = fileUrl;

  number: number = 1;

  constructor(
    private commandeService: CommandeService,
  ) { }

  ngOnInit(): void {

  }

  commander(){
    if(this.number > 0)
      this.commandeService.ajouterCommande(this.plat, this.number);
  }

}
