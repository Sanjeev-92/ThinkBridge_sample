/*----------------------List your Modules here--------------------------------*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

// Import library module
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner"
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertModule } from 'ngx-alerts';

/*----------------------List your component here--------------------------------*/
import { StoreListComponent } from 'src/modules/inventory-sample/store-list/store-list.component';
import { AddItemComponent } from 'src/modules/inventory-sample/add-item/add-item.component';
import { P404Component } from 'src/common/components/p404/p404.component';
import { P500Component } from 'src/common/components/p500/p500.component';

/*----------------------List your services here--------------------------------*/
import { BaseService } from 'src/common/services/base-service';



@NgModule({
  declarations: [ 
    AppComponent,
    StoreListComponent,
    AddItemComponent,
    P404Component,
    P500Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    AlertModule.forRoot()
  ],
  exports: [
    NgxSpinnerModule
  ],
  providers: [BaseService,NgxSpinnerService],
  bootstrap: [AppComponent]
})
export class AppModule { } 
 