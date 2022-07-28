import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";
import { SubscriptionHelper } from "src/app/utils/subscription-helper";

@Component({
  selector: "app-breadcrumb",
  templateUrl: "./breadcrumb.component.html",
  styleUrls: ["./breadcrumb.component.scss"],
})
export class BreadcrumbComponent extends SubscriptionHelper implements OnInit {
  breadcrumbs: Array<Breadcrumb> = [];

  constructor(private router: Router, private route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.registerSubscription(
      this.router.events
        .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
        .subscribe(() => {
          this.breadcrumbs = [];
          this.getBreadcrumbs(this.route);
          console.log(this.breadcrumbs);
        })
    );
  }

  private getBreadcrumbs(route: ActivatedRoute) {
    const children: ActivatedRoute[] = route.children;
    console.log(children);
    if (children.length === 0) {
      return this.breadcrumbs;
    }

    for (const child of children) {
      const subscription = child.data.subscribe((d: Breadcrumb) =>
        this.addBreadcrumb(d)
      );
      subscription.unsubscribe();
      return this.getBreadcrumbs(child);
    }
  }

  private addBreadcrumb(breadcrumb: Breadcrumb) {
    if (breadcrumb && breadcrumb.label) {
      const labels = this.breadcrumbs.map((b) => b.label);
      if (!labels.includes(breadcrumb.label)) {
        this.breadcrumbs.push(breadcrumb);
      }
    }
  }
}

interface Breadcrumb {
  label: string;
  url: string;
}
