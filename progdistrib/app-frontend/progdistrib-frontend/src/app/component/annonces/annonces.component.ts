import { Component, inject, OnInit } from '@angular/core';
import { AnnonceService } from '../../services/annonces.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  styleUrls: ['./annonces.component.scss'],
  imports: [
    CommonModule,
    RouterModule
  ],
})

export class AnnoncesComponent implements OnInit {
  private annonceService = inject(AnnonceService);
  annonces = this.annonceService.annonces;
  errorMessage: string | null = null; 

  ngOnInit(){
    this.annonceService.getAnnonces().subscribe();
    error: (error: any) => {
            console.error('Erreur lors de la récupération des annonces :', error);
            this.errorMessage = "Une erreur est survenue lors de la récupération des annonces.";
          }
  }
}
