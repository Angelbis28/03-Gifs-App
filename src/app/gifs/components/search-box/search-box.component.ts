import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html'
})

export class SearchBoxComponent {

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>

  constructor( private gifsService: GifsService) {}

    searchTag() {
      //Insertamos los valores de la busqueda a la caja
      const newTag = this.tagInput.nativeElement.value;

      this.gifsService.searchTag( newTag );
      

      //Limpio la caja de texto
      this.tagInput.nativeElement.value = '';
    }
}