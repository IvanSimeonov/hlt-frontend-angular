import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "home",
    component: DashboardComponent,
  },
  {
    path: "foods",
    data: { label: "Foods", url: "/foods" },
    loadChildren: () =>
      import("./food-management/food-management-routing.module").then(
        (module) => module.FoodManagementRoutingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
