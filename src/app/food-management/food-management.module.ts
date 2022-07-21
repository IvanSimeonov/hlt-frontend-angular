import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FoodCreateComponent } from "./food-create/food-create.component";
import { FoodEditComponent } from "./food-edit/food-edit.component";
import { FoodDetailsComponent } from "./food-details/food-details.component";
import { FoodListComponent } from "./food-list/food-list.component";
import { ReactiveFormsModule } from "@angular/forms";
import { FoodManagementRoutingModule } from "./food-management-routing.module";
import { PaginationComponent } from "../pagination/pagination.component";
import { SearchComponent } from "../search/search.component";

@NgModule({
  declarations: [
    FoodCreateComponent,
    FoodEditComponent,
    FoodDetailsComponent,
    FoodListComponent,
    PaginationComponent,
    SearchComponent
  ],
  imports: [CommonModule, ReactiveFormsModule, FoodManagementRoutingModule],
})
export class FoodManagementModule {}
