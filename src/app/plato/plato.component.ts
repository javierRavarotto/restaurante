import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlatosService } from '../platos/platos.service';

@Component({
  selector: 'app-plato',
  templateUrl: './plato.component.html',
  styleUrls: ['./plato.component.css']
})
export class PlatoComponent implements OnInit {
  loading:boolean;
  plato: any;
  ingredientes:any

  constructor(private platoService : PlatosService , private http:HttpClient,private activatedRoute:ActivatedRoute) { 
    this.loading=true
    this.activatedRoute.params.subscribe(params=>{
    
      this.buscarDatoReceta(params['id']);

     
    })
  }

  ngOnInit(): void {
  }
  buscarDatoReceta(id:string){
    this.platoService.buscarDatoReceta(id).subscribe((data:any) =>{
    
      console.log(data)
      this.plato=data
      this.ingredientes=data.extendedIngredients
      this.loading=false
  
        })
  }
}
