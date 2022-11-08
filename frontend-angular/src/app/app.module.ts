import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {CrudTableComponent} from './layout/crud-table/crud-table.component';
import {HttpClientModule} from "@angular/common/http";
import {TableModule} from "primeng/table";
import {CardModule} from "primeng/card";
import {ToolbarModule} from "primeng/toolbar";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {TooltipModule} from "primeng/tooltip";

@NgModule({
  declarations: [
    AppComponent,
    CrudTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TableModule,
    CardModule,
    ToolbarModule,
    ButtonModule,
    RippleModule,
    TooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
