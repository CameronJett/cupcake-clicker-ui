import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CupcakeClickerComponent } from './components/cupcake-clicker/cupcake-clicker.component';


const routes: Routes = [
  {
    path: "",
    component: CupcakeClickerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
