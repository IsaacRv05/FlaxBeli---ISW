import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { AcercaDeComponent } from '../core/acerca-de/acerca-de.component';

const routes: Routes = [
  { path: 'home', component: InicioComponent },
  { path: 'core/acerca-de', component: AcercaDeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
