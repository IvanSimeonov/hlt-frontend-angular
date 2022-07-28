import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FoodCreateComponent } from "./food-create/food-create.component";
import { FoodEditComponent } from "./food-edit/food-edit.component";
import { FoodDetailsComponent } from "./food-details/food-details.component";
import { FoodListComponent } from "./food-list/food-list.component";
import { ReactiveFormsModule } from "@angular/forms";
import { FoodManagementRoutingModule } from "./food-management-routing.module";
import { NgChartsModule } from "ng2-charts";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    FoodCreateComponent,
    FoodEditComponent,
    FoodDetailsComponent,
    FoodListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FoodManagementRoutingModule,
    NgChartsModule,
    SharedModule,
  ],
})
export class FoodManagementModule {}
