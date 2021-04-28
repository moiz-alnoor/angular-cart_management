import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemComponent } from '../app/item/item.component';
import { PayComponent } from '../app/pay/pay.component';

const routes: Routes = [
   { path: '', component: ItemComponent },
   { path: 'pay/:totalItem', component: PayComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//https://www.smashingmagazine.com/2018/11/a-complete-guide-to-routing-in-angular/