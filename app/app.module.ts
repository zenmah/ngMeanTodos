import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import {TodosComponent} from './todos/todos.component'
import {TodosService} from './todos/shared/todos.service'


@NgModule({
  imports:      [ BrowserModule,HttpModule,FormsModule ],
  declarations: [ AppComponent,TodosComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ TodosService]
})
export class AppModule { }
