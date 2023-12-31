import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private apiKey: string = 'eOZnAbIZqvyWIVGY2yf8iP8sbVBS7VFj';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient) {
    this.loadLocalStorage();
    console.log('Gifs Service Ready');
    
   }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    //Valido si ya existe no lo va a mostrar
    if( this._tagsHistory.includes(tag) ){
      //El filter sirve para refresar un nuevo arreglo pero solo los verdaderos
      this._tagsHistory = this._tagsHistory.filter( (oldTag ) => oldTag != tag ) 
    }

    // lo inserto de nuevo al inicio
    this._tagsHistory.unshift( tag );

    // valido insertar solo 10 elementos
    this._tagsHistory = this.tagsHistory.slice(0,10);

    // GUardar los datos para que sean Persistentes
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify( this._tagsHistory ));
  }

  private loadLocalStorage(): void {
    if(!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history') !);

    // Aqui valido y muestro el primero elemento del History
    if ( this._tagsHistory.length === 0) return;
    this.searchTag( this._tagsHistory[0] );
  }

 searchTag( tag: string ): void {
    if ( tag.length === 0 ) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
    .set('api_key', this.apiKey )
    .set('limit', '10' )
    .set('q', tag )
    ;

    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, { params})
    .subscribe( resp => {
      this.gifList = resp.data;
    })


  }

}
