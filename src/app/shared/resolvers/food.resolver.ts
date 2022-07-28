import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { catchError, delay, EMPTY, Observable, of } from "rxjs";
import { FoodService } from "src/api/food.service";
import { FoodDTO } from "src/api/model/foodDTO";

@Injectable({
  providedIn: "root",
})
export class FoodResolver implements Resolve<FoodDTO> {
  constructor(private foodService: FoodService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<FoodDTO> {
    return this.foodService.getFoodById(route.params["id"]).pipe(
      delay(2000),
      catchError(() => {
        this.router.navigate(["/list"]);
        return EMPTY;
      })
    );
  }
}
