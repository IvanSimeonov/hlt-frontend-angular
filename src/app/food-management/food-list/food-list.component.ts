import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { FoodService } from "src/api/food.service";
import { FoodPageDTO } from "src/api/model/foodPageDTO";

@Component({
  selector: "app-food-list",
  templateUrl: "./food-list.component.html",
  styleUrls: ["./food-list.component.scss"],
})
export class FoodListComponent implements OnInit {
  foodsPerPage = 5;
  foodPage: FoodPageDTO | undefined;
  currentPage = 0;
  totalPages = 0;
  searchedWord = "";
  filter: any;
  foodsPerPageFormControl = new FormControl(this.foodsPerPage);
  sortBy = "";

  constructor(private foodService: FoodService) {}

  ngOnInit() {
    this.foodService
      .searchFoodsPage(this.foodsPerPage, 0, this.sortBy, this.searchedWord)
      .subscribe((page: FoodPageDTO | undefined) => {
        this.foodPage = page;
        this.currentPage = page ? page?.pageNumber ? page.pageNumber : 0 : 0;
        this.totalPages = page ? page.totalPages ? page.totalPages : 0 : 0;
      });

    this.foodsPerPageFormControl.valueChanges.subscribe(
      (foodsPerPage) => {
        this.foodsPerPage = foodsPerPage ? foodsPerPage : 0;
        this.loadFoodPage(0);
      }
    );
  }

  loadFoodPage(pageNumber: number) {
    console.log(
      "Loading page: " +
        pageNumber +
        " foods per page: " +
        this.foodsPerPage
    );
    this.foodService
      .searchFoodsPage(this.foodsPerPage, pageNumber, this.sortBy ,this.searchedWord)
      .subscribe((page) => {
        console.log(page);
        this.foodPage = page;
        this.currentPage = page.pageNumber;
        this.totalPages = page.totalPages;
      });
  }

  searchWordChanged(word: string) {
    this.filter = word;
    this.searchedWord = word;
    this.loadFoodPage(0);
  }

  setSortBy() {
    this.sortBy = "DESC, id";
    console.log(this.sortBy);
    this.loadFoodPage(0);
  }
}
