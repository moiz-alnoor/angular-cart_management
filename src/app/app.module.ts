import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ItemComponent } from './item/item.component';
import { PayComponent } from './pay/pay.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    PayComponent,
  ],
  imports: [
    BrowserModule, FormsModule, NgSelectModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
  //  NgSelectModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
