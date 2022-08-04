import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FoodManagementModule } from "./food-management/food-management.module";
import { NgChartsModule } from "ng2-charts";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { SharedModule } from "./shared/shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { BodyMassIndexComponent } from './body-mass-index/body-mass-index.component';

@NgModule({
  declarations: [AppComponent, DashboardComponent, BodyMassIndexComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgChartsModule,
    ReactiveFormsModule,
    FoodManagementModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
