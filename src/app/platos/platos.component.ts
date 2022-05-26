import { Component, OnInit } from '@angular/core';
import { PlatosService } from './platos.service';
import { Plato } from './Plato';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-platos',
  templateUrl: './platos.component.html',
  styleUrls: ['./platos.component.css']
})
export class PlatosComponent implements OnInit {
  platos: any[]=[];
  pedidos:any []=[];
  total:number=0
  calorias:number=0
  tiempo:number=0
  promedio:number= 0
 
  valor:Plato = new Plato
  constructor(private platoService : PlatosService , private http:HttpClient,private activatedRoute:ActivatedRoute,private router :Router) {
    this.cargarStorage()
   this.platoService.buscarPlatos().subscribe((data:any) =>{
    
          this.platos= data.results
        })

  
      }   
   

  ngOnInit(): void {
  }

  buscarPlatos(){
    this.http.get("https://api.spoonacular.com/recipes/complexSearch?apiKey=a43e048879d348ccbb33f092e2a1e6bf")
    .subscribe((data:any) =>{
      console.log(data.results)
      this.platos= data.results
   })
  }
  buscarDatoReceta(id:string){
    this.platoService.buscarDatoReceta(id).subscribe((data:any) =>{
      this.router.navigate(['/plato',data.id])
      
  
        })
  }

  agregarPlato(data:any){

    this.platoService.buscarDatoReceta(data.id).subscribe((data:any) =>{
      this.pedidos.push(data)
      this.sumarToral()
        })
        
        
        
      
}
borrarPlato(data:any , i:any){
  this.platoService.buscarDatoReceta(data.id).subscribe((data:any) =>{
    this.pedidos =this.pedidos.filter(pedido => pedido.id != data.id)
    
    this.sumarToral()
      }) 
     
      
}
sumarToral(){
  this.total=0
  this.calorias=0
  this.tiempo=0
  this.pedidos.forEach(element => {
    
    this.total= this.total + Math.trunc(element.pricePerServing)
    this.calorias=this.calorias +Math.trunc(element.healthScore)
    this.tiempo= this.tiempo + Math.trunc(element.readyInMinutes)
    Math.trunc(this.total)
    Math.trunc(this.calorias)
    Math.trunc(this.tiempo)
  this.promedio= this.tiempo / this.pedidos.length
  })
  if (this.pedidos.length==0) {
    this.promedio=0
  }
  this.guardarStorage()
};


reiniciar(){
  this.total=0
  this.calorias=0
  this.promedio=0
  this.pedidos=[]
  this.guardarStorage()
}

guardarStorage(){
  
  
  localStorage.setItem('data', JSON.stringify(this.pedidos));
  localStorage.setItem('total', JSON.stringify(this.total));
  localStorage.setItem('calorias', JSON.stringify(this.calorias));
  localStorage.setItem('promedio', JSON.stringify(this.promedio));
  
 }

 cargarStorage(){
  if (localStorage.getItem('data')) {
    this.pedidos=JSON.parse(localStorage.getItem('data')||'{}')
    this.total=JSON.parse(localStorage.getItem('total')||'{}')
    this.calorias=JSON.parse(localStorage.getItem('calorias')||'{}')
    this.promedio=JSON.parse(localStorage.getItem('promedio')||'{}')
   
  
    
  }else{
    this.pedidos =[]
    this.total=0
    this.calorias=0
    this.tiempo=0
  }

 }
 
}


