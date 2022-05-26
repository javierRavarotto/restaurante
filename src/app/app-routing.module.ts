import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PlatoComponent } from './plato/plato.component';
import { PlatosComponent } from './platos/platos.component';

const routes: Routes = [
  { path: 'platos', component: PlatosComponent },
  {path: 'plato/:id', component: PlatoComponent},
  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
