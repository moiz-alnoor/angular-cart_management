import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ItemComponent } from '../app/item/item.component';
import { PayComponent } from '../app/pay/pay.component';

const routes: Routes = [
   { path: '', component: ItemComponent },
   { path: 'pay/:item_number', component: PayComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
