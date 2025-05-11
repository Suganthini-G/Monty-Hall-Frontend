import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MontyHallComponent } from './monty-hall/monty-hall.component';
import { MontyHallDiagramComponent } from './monty-hall-diagram/monty-hall-diagram.component';

@NgModule({
  declarations: [
    AppComponent,
    MontyHallComponent,
    MontyHallDiagramComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,  
    AppRoutingModule,
    HttpClientModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
