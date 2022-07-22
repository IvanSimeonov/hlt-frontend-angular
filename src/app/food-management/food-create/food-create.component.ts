import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FoodService } from "src/api/food.service";

@Component({
  selector: "app-food-create",
  templateUrl: "./food-create.component.html",
  styleUrls: ["./food-create.component.scss"],
})
export class FoodCreateComponent implements OnInit {

  additionalInfo = false;

  foodForm = new FormGroup({
    brandName: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    calories: new FormControl("", [
      Validators.required,
      Validators.pattern("^[0-9]+$"),
    ]),
    proteins: new FormControl(""),
    totalCarbohydrates: new FormControl(""),
    fibers: new FormControl(""),
    sugars: new FormControl(""),
    totalFats: new FormControl(""),
    saturatedFats: new FormControl(""),
    polyUnsaturatedFats: new FormControl(""),
    monoUnsaturatedFats: new FormControl(""),
    transFats: new FormControl(""),
    cholesterol: new FormControl(""),
    sodium: new FormControl(""),
    potassium: new FormControl(""),
    calcium: new FormControl(""),
    iron: new FormControl(""),
    vitaminA: new FormControl(""),
    vitaminB1: new FormControl(""),
    vitaminB2: new FormControl(""),
    vitaminB3: new FormControl(""),
    vitaminB5: new FormControl(""),
    vitaminB6: new FormControl(""),
    vitaminB7: new FormControl(""),
    vitaminB9: new FormControl(""),
    vitaminB12: new FormControl(""),
    vitaminC: new FormControl(""),
    vitaminD: new FormControl(""),
    vitaminE: new FormControl(""),
    vitaminK: new FormControl(""),
    omega3: new FormControl(""),
    omega6: new FormControl(""),
    omega9: new FormControl(""),
  });

  constructor(private foodService: FoodService) {}

  ngOnInit(): void {}

  onAdditionalInfo() {
    this.additionalInfo = !this.additionalInfo;
  }

  onSubmit() {
    console.log(this.foodForm.value);
    this.foodService.addNewFood(this.foodForm.value).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
