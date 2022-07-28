import { Injectable, OnDestroy } from "@angular/core";
import { Unsubscribable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export abstract class SubscriptionHelper implements OnDestroy {
  private subscriptions: Array<Unsubscribable> = [];

  registerSubscription(subscription: Unsubscribable) {
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
