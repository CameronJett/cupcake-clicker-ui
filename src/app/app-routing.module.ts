import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CupcakeClickerComponent } from './components/cupcake-clicker/cupcake-clicker.component';
import { LoginPageComponent } from './components/login-page/login-page.component';


const routes: Routes = [
  {
    path: "",
    component: LoginPageComponent
  },
  {
    path: "cupcake-clicker",
    component: CupcakeClickerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
