import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Plato } from './Plato';
import { of,Observable } from 'rxjs';
import { map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PlatosService {
  platos: any[]=[];
  pedidos: any[]=[];
  valor:Plato = new Plato

  url:string="https://api.spoonacular.com/"
  key1:string="?apiKey=a43e048879d348ccbb33f092e2a1e6bf"
  key2:string="?apiKey=6af7213899304ab1869a940cefa92c05"
  key3:string="?apiKey=73d08b24436f4f09ad2079bda7a039bf"
  
  constructor(private http:HttpClient) { 

   
  }



  query(cosulta:string){
    return  this.http.get(`${this.url}${cosulta}${this.key1}&number=20`)
  }

  buscarPlatos(){
   return this.query("recipes/complexSearch")
  }

 buscarDatoReceta(id:string){
  return this.query(`recipes/${id}/information`)
 }

 



   
}
