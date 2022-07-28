import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, ResolveEnd, ResolveStart, Router } from "@angular/router";
import { FoodService } from "src/api/food.service";
import { FoodPageDTO } from "src/api/model/foodPageDTO";
import { Chart } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { FoodDTO } from "src/api/model/foodDTO";
import { filter, map, mapTo, merge, Observable, switchMap } from "rxjs";
import { SubscriptionHelper } from "src/app/utils/subscription-helper";
declare var window: any;

Chart.register(ChartDataLabels);

@Component({
  selector: "app-food-list",
  templateUrl: "./food-list.component.html",
  styleUrls: ["./food-list.component.scss"],
})
export class FoodListComponent extends SubscriptionHelper implements OnInit {
  foodsPerPage = 5;
  foodPage: FoodPageDTO | undefined;
  currentPage = 0;
  totalPages = 0;
  searchedWord = "";
  filter: any;
  foodsPerPageFormControl = new FormControl(this.foodsPerPage);
  sortBy = "";
  formModal: any;
  foodToDeleteId: number;
  foodToDelete: FoodDTO;

  isLoading$!: Observable<boolean>;
  private _showLoaderEvents$!: Observable<boolean>;
  private _hideLoaderEvents$!: Observable<boolean>;

  constructor(
    private foodService: FoodService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {

    this._showLoaderEvents$ = this.router.events.pipe(
      filter((e) => e instanceof ResolveStart),
      map(() => true)
    );

    this._hideLoaderEvents$ = this.router.events.pipe(
      filter((e) => e instanceof ResolveEnd),
      map(() => false)
    );
    this.isLoading$ = merge(this._hideLoaderEvents$, this._showLoaderEvents$);

    this.formModal = new window.bootstrap.Modal(
      document.getElementById("myModal")
    );
    this.registerSubscription(
      this.foodService
        .searchFoodsPage(this.foodsPerPage, 0, this.sortBy, this.searchedWord)
        .subscribe((page: FoodPageDTO | undefined) => {
          this.foodPage = page;
          this.currentPage = page
            ? page?.pageNumber
              ? page.pageNumber
              : 0
            : 0;
          this.totalPages = page ? (page.totalPages ? page.totalPages : 0) : 0;
        })
    );

    this.registerSubscription(
      this.foodsPerPageFormControl.valueChanges.subscribe((foodsPerPage) => {
        this.foodsPerPage = foodsPerPage ? foodsPerPage : 0;
        this.loadFoodPage(0);
      })
    );
  }

  loadFoodPage(pageNumber: number) {
    console.log(
      "Loading page: " + pageNumber + " foods per page: " + this.foodsPerPage
    );
    this.registerSubscription(
      this.foodService
        .searchFoodsPage(
          this.foodsPerPage,
          pageNumber,
          this.sortBy,
          this.searchedWord
        )
        .subscribe((page) => {
          console.log(page);
          this.foodPage = page;
          this.currentPage = page.pageNumber;
          this.totalPages = page.totalPages;
        })
    );
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

  createFood() {
    this.router.navigate([{ outlets: { details: "create" } }], {
      relativeTo: this.activatedRoute,
    });
  }

  editFood(foodId: number) {
    this.router.navigate([{ outlets: { details: "edit/" + foodId } }], {
      relativeTo: this.activatedRoute,
    });
  }

  foodDetails(foodId: number) {
    this.router.navigate([{ outlets: { details: "details/" + foodId } }], {
      relativeTo: this.activatedRoute,
    });
  }

  openDeleteFormModal(foodId: number) {
    console.log("Modal should open.. " + foodId);
    this.foodToDeleteId = foodId;
    this.registerSubscription(
      this.foodService.getFoodById(foodId).subscribe((data) => {
        this.foodToDelete = data;
      })
    );
    this.formModal.show();
  }

  deleteFood() {
    console.log("Modal should close.. " + this.foodToDeleteId);
    this.registerSubscription(this.foodService.deleteFoodById(this.foodToDeleteId).subscribe());
    this.formModal.hide();
    this.loadFoodPage(0);
  }
}
