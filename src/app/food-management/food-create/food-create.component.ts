import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { FoodService } from "src/api/food.service";
import { SubscriptionHelper } from "src/app/utils/subscription-helper";
import { FoodListComponent } from "../food-list/food-list.component";

@Component({
  selector: "app-food-create",
  templateUrl: "./food-create.component.html",
  styleUrls: ["./food-create.component.scss"],
  providers: [FoodCreateComponent],
})
export class FoodCreateComponent extends SubscriptionHelper implements OnInit {
  foodForm!: FormGroup;
  additionalInfo = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private foodService: FoodService,
    private foodListComponent: FoodListComponent
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  onAdditionalInfo() {
    this.additionalInfo = !this.additionalInfo;
  }

  onSubmit() {
    this.registerSubscription(this.foodService.addNewFood(this.foodForm.value).subscribe((error) => {
      console.log(error);
    }));
    this.router.navigate([{}], { relativeTo: this.route.parent });
    this.foodListComponent.loadFoodPage(0);
  }

  closeRouterOutlet() {
    this.router.navigate([{}], { relativeTo: this.route.parent });
  }

  initForm() {
    this.foodForm = this.formBuilder.group({
      id: [""],
      brandName: ["", Validators.required],
      description: ["", Validators.required],
      calories: ["", [Validators.required, Validators.pattern("^[0-9]+$")]],
      proteins: [""],
      totalCarbohydrates: [""],
      fibers: [""],
      sugars: [""],
      totalFats: [""],
      saturatedFats: [""],
      polyUnsaturatedFats: [""],
      monoUnsaturatedFats: [""],
      transFats: [""],
      cholesterol: [""],
      sodium: [""],
      potassium: [""],
      calcium: [""],
      iron: [""],
      vitaminA: [""],
      vitaminB1: [""],
      vitaminB2: [""],
      vitaminB3: [""],
      vitaminB5: [""],
      vitaminB6: [""],
      vitaminB7: [""],
      vitaminB9: [""],
      vitaminB12: [""],
      vitaminC: [""],
      vitaminD: [""],
      vitaminE: [""],
      vitaminK: [""],
      omega3: [""],
      omega6: [""],
      omega9: [""],
    });
  }
}
