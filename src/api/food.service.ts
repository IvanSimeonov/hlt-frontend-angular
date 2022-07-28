import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { FoodPageDTO } from "./model/foodPageDTO";

@Injectable({
  providedIn: "root",
})
export class FoodService {
  private basePath = "http://localhost:8080/";

  constructor(private http: HttpClient) {}

  addNewFood(data): Observable<any> {
    console.log(data);
    return this.http.post(`${this.basePath}` + "foods/create", data);
  }

  updateFoodById(id, data): Observable<any> {
    console.log(data);
    return this.http.put(`${this.basePath}` + "foods/" + id, data);
  }

  getAllFoods(): Observable<any> {
    return this.http.get(`${this.basePath}` + "foods");
  }

  getFoodById(id: number): Observable<any> {
    return this.http.get(`${this.basePath}` + "foods/" + id);
  }

  deleteFoodById(id: number): Observable<any> {
    return this.http.delete(`${this.basePath}` + "foods/" + id);
  }

  searchFoodsPage(
    pageSize: number,
    pageNumber: number,
    sortBy: string,
    searchedWord: string
  ): Observable<any> {
    if (pageSize === null || pageSize === undefined) {
      throw new Error(
        "Required pageSize is null or undefined when calling searchFoodsPage"
      );
    }
    if (pageNumber === null || pageNumber === undefined) {
      throw new Error(
        "Required pageNumber is null or undefined when calling searchFoodsPage"
      );
    }
    if (sortBy === null || sortBy === undefined) {
      throw new Error(
        "Required sortBy is null or undefined when calling searchFoodsPage"
      );
    }
    if (searchedWord === null || searchedWord === undefined) {
      throw new Error(
        "Required searchWord is null or undefined when calling searchFoodsPage"
      );
    }

    let params = {
      pageSize: pageSize,
      pageNumber: pageNumber,
      sortBy: sortBy,
      searchWord: searchedWord,
    };
    console.log(params);
    return this.http.get<FoodPageDTO>(`${this.basePath}` + "foods/pages", {
      params: params,
    });
  }
}
