import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PaginationComponent } from "./pagination/pagination.component";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { FooterComponent } from "./footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { SearchComponent } from "./search/search.component";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "../app-routing.module";

@NgModule({
  declarations: [
    BreadcrumbComponent,
    HeaderComponent,
    FooterComponent,
    PaginationComponent,
    SearchComponent,
  ],
  imports: [CommonModule, HttpClientModule, AppRoutingModule],
  exports: [
    BreadcrumbComponent,
    HeaderComponent,
    FooterComponent,
    PaginationComponent,
    SearchComponent,
  ],
})
export class SharedModule {}
