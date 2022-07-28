import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  ChartConfiguration,
  ChartDataset,
  ChartOptions,
  ChartType,
} from "chart.js";
import { FoodService } from "src/api/food.service";
import { FoodDTO } from "src/api/model/foodDTO";
import * as pluginDataLabels from "chartjs-plugin-datalabels";
import { SubscriptionHelper } from "src/app/utils/subscription-helper";

@Component({
  selector: "app-food-details",
  templateUrl: "./food-details.component.html",
  styleUrls: ["./food-details.component.scss"],
})
export class FoodDetailsComponent extends SubscriptionHelper implements OnInit {
  food: FoodDTO;
  proteinPercentage: number;
  carbohydratesPercentage: number;
  fatsPercentage: number;

  public doughnutChartOptions: ChartConfiguration<"doughnut">["options"] = {
    responsive: false,
    plugins: {
      legend: {
        display: true,
        onClick: null,
      },
      datalabels: {
        formatter: (value, context) => {
          console.log("TRiggered");
          console.log(context.chart);
          let total: number = 0;
          context.dataset.data.map((data: number) => (total += data));
          return (
            Math.round(((value / total) * 100 + Number.EPSILON) * 100) / 100 +
            "%"
          );
        },
        display: true,
        anchor: "center",
        align: "center",
        font: {
          size: 12,
          weight: 600,
        },
        color: "#000000",
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#FF00FF",
        callbacks: {
          label: (context) => {
            let label = context.label + ": " + context.parsed + "g";
            return label;
          },
        },
      },
      title: {
        display: true,
        text: "Macros",
      },
    },
  };

  public doughnutChartLabels: string[] = ["Proteins", "Carbohydrates", "Fats"];
  public doughnutChartType: ChartType = "doughnut";
  public doughnutChartPlugins = [pluginDataLabels];
  public doughnutChartData: ChartDataset[] = [
    {
      label: "Example",
      data: [33, 44, 55],
      datalabels: {
        color: "#36A2EB",
        display: true,
      },
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private foodService: FoodService
  ) {
    super();
  }

  ngOnInit(): void {
    this.registerSubscription(
      this.route.params.subscribe((params) => {
        this.registerSubscription(
          this.foodService.getFoodById(params["id"]).subscribe((data) => {
            this.food = data;
            console.log("FOOD: " + this.food.brandName);
            this.doughnutChartData = [
              {
                label: this.food.brandName + " " + this.food.description,
                data: [
                  this.food.proteins,
                  this.food.totalCarbohydrates,
                  this.food.totalFats,
                ],
                backgroundColor: ["#FF0000", "#00FF00", "#0000FF"],
                hoverBackgroundColor: ["#FF0000", "#00FF00", "#0000FF"],
                hoverBorderColor: "#000000",
              },
            ];
          })
        );
      })
    );
  }

  closeRouterOutlet() {
    this.router.navigate([{}], { relativeTo: this.route.parent });
  }
}
