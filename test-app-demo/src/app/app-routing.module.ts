import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { ListUserComponent } from './list-user/list-user.component';

const routes: Routes = [

   {path : "createUser" , component : CreateUserComponent},
   {path : "list" , component : ListUserComponent},
   {path : "edit/:id" , component : CreateUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
