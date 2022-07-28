import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FoodResolver } from "../shared/resolvers/food.resolver";
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
    data: { label: "Foods", url: "/list" },
    component: FoodListComponent,
    children: [
      {
        path: "details/:id",
        data: { label: "Detail" },
        component: FoodDetailsComponent,
        resolve: {
          food: FoodResolver,
        },
        outlet: "details",
      },
      {
        path: "edit/:id",
        data: { label: "Edit" },
        component: FoodEditComponent,
        resolve: {
          food: FoodResolver,
        },
        outlet: "details",
      },
      {
        path: "create",
        data: { label: "Create" },
        component: FoodCreateComponent,
        outlet: "details",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodManagementRoutingModule {}
