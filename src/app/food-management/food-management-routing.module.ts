import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FoodCreateComponent } from "./food-create/food-create.component";
import { FoodDetailsComponent } from "./food-details/food-details.component";
import { FoodEditComponent } from "./food-edit/food-edit.component";
import { FoodListComponent } from "./food-list/food-list.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "list",
    pathMatch: "full",
  },
  {
    path: "list",
    component: FoodListComponent,
  },
  {
    path: "details/:id",
    component: FoodDetailsComponent,
  },
  {
    path: "edit/:id",
    component: FoodEditComponent,
  },
  {
    path: "create",
    component: FoodCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodManagementRoutingModule {}
