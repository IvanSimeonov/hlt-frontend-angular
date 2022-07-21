import { Component } from '@angular/core';
import { FoodService } from 'src/api/food.service';
import { FoodDTO } from 'src/api/model/foodDTO';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hlt-frontend-angular';

  foods: FoodDTO[] = [];

  constructor(private foodService: FoodService) { }

  ngOnInit(): void {
    this.foodService.getAllFoods().subscribe(data => {
      this.foods = data;
      console.log(data);
    });
  }
}
