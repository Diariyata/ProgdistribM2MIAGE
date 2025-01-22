import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AnnonceService } from '../../services/annonces.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
  imports: [CommonModule],
})
export class DescriptionComponent implements OnInit {
  private annonceService = inject(AnnonceService);
  private route = inject(ActivatedRoute);

  description: any;
  errorMessage: string | null = null;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); // Récupérer l'ID de l'URL
    console.log('ID récupéré :', id);

    if (id) {
      this.annonceService.getOneAnnonce(+id).subscribe({
        next: (data) => {
          this.description = data;
          console.log('Description récupérée :', data);
        },
        error: (error) => {
          console.error('Erreur lors de la récupération de la description :', error);
          this.errorMessage = 'Une erreur est survenue lors de la récupération de la description.';
        },
      });
    } else {
      this.errorMessage = 'Aucun ID valide trouvé.';
    }
  }
}
