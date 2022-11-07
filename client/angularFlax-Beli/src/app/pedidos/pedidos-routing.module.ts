import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidosAllComponent } from './pedidos-all/pedidos-all.component';

const routes: Routes = [
  {path:'pedidos/all', component: PedidosAllComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }
