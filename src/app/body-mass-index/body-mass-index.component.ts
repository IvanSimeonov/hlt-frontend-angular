import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { SubscriptionHelper } from "../utils/subscription-helper";

@Component({
  selector: "app-body-mass-index",
  templateUrl: "./body-mass-index.component.html",
  styleUrls: ["./body-mass-index.component.scss"],
})
export class BodyMassIndexComponent
  extends SubscriptionHelper
  implements OnInit
{
  bmiForm!: FormGroup;
  bmiCalculated = false;
  bmiResult!: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    console.log("Submitted");
    this.bmiCalculated = true;
    const weight = this.bmiForm.value.weight;
    const height = this.bmiForm.value.height;
    this.bmiResult =
      Math.round((weight / Math.pow(height / 100, 2) + Number.EPSILON) * 100) /
      100;
  }

  recalculateBMI() {
    this.bmiCalculated = false;
  }

  initForm() {
    this.bmiForm = this.formBuilder.group({
      weight: [
        "",
        [
          Validators.required,
          Validators.pattern("^[0-9]+([.]{0,1}[0-9]{1,2})?$"),
        ],
      ],
      height: [
        "",
        [
          Validators.required,
          Validators.pattern("^[0-9]+([.]{0,1}[0-9]{1,2})?$"),
        ],
      ],
    });
  }
}
