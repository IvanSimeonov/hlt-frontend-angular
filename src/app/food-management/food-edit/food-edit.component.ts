import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { FoodService } from "src/api/food.service";
import { FoodDTO } from "src/api/model/foodDTO";
import { SubscriptionHelper } from "src/app/utils/subscription-helper";

@Component({
  selector: "app-food-edit",
  templateUrl: "./food-edit.component.html",
  styleUrls: ["./food-edit.component.scss"],
})
export class FoodEditComponent extends SubscriptionHelper implements OnInit {
  foodForm!: FormGroup;
  foodDTO!: FoodDTO;
  foodId!: number;
  additionalInfo = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private foodService: FoodService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
    this.registerSubscription(
      this.route.params.subscribe((params) => {
        this.foodService.getFoodById(params["id"]).subscribe((data) => {
          this.foodId = params["id"];
          this.foodDTO = data;
          this.fillForm();
        });
      })
    );
  }

  onAdditionalInfo() {
    this.additionalInfo = !this.additionalInfo;
  }

  onSubmit() {
    this.registerSubscription(
      this.foodService
        .updateFoodById(this.foodId, this.foodForm.value)
        .subscribe((error) => {
          console.log(error);
        })
    );
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

  fillForm() {
    this.foodForm = this.formBuilder.group({
      id: [""],
      brandName: [this.foodDTO.brandName, Validators.required],
      description: [this.foodDTO.description, Validators.required],
      calories: [
        this.foodDTO.calories,
        [Validators.required, Validators.pattern("^[0-9]+$")],
      ],
      proteins: [this.foodDTO.proteins],
      totalCarbohydrates: [this.foodDTO.totalCarbohydrates],
      fibers: [this.foodDTO.fibers],
      sugars: [this.foodDTO.sugars],
      totalFats: [this.foodDTO.totalFats],
      saturatedFats: [this.foodDTO.saturatedFats],
      polyUnsaturatedFats: [this.foodDTO.polyUnsaturatedFats],
      monoUnsaturatedFats: [this.foodDTO.monoUnsaturatedFats],
      transFats: [this.foodDTO.transFats],
      cholesterol: [this.foodDTO.cholesterol],
      sodium: [this.foodDTO.sodium],
      potassium: [this.foodDTO.potassium],
      calcium: [this.foodDTO.calcium],
      iron: [this.foodDTO.iron],
      vitaminA: [this.foodDTO.vitaminA],
      vitaminB1: [this.foodDTO.vitaminB1],
      vitaminB2: [this.foodDTO.vitaminB2],
      vitaminB3: [this.foodDTO.vitaminB3],
      vitaminB5: [this.foodDTO.vitaminB5],
      vitaminB6: [this.foodDTO.vitaminB6],
      vitaminB7: [this.foodDTO.vitaminB7],
      vitaminB9: [this.foodDTO.vitaminB9],
      vitaminB12: [this.foodDTO.vitaminB12],
      vitaminC: [this.foodDTO.vitaminC],
      vitaminD: [this.foodDTO.vitaminD],
      vitaminE: [this.foodDTO.vitaminE],
      vitaminK: [this.foodDTO.vitaminK],
      omega3: [this.foodDTO.omega3],
      omega6: [this.foodDTO.omega6],
      omega9: [this.foodDTO.omega9],
    });
  }
}
