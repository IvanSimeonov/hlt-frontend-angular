import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  private pageCount = 0;
  private nearPagesShown = 2;
  private current = 0;
  pages: Array<number> | undefined;

  get totalPages() {
    return this.pageCount;
  }

  @Input('totalPages') set totalPages(value: number) {
    this.pageCount = value;
    this.recalculateShowPages();
  }

  @Input('currentPage') set currentPage(value: number) {
    this.current = value;
    this.recalculateShowPages();
  }

  get currentPage() {
    return this.current;
  }

  get displayNearPages() {
    return this.nearPagesShown;
  }

  @Input('displayNearPages') set displayNearPages(value: number) {
    this.nearPagesShown = value;
    this.recalculateShowPages();
  }

  @Output() pageRequested = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
    this.recalculateShowPages();
  }

  loadPage(pageNumber: number) {
    this.pageRequested.emit(pageNumber);
  }

  private recalculateShowPages() {
    // no need to display pagination
    if (this.totalPages < 2) {
      return;
    }

    if (this.displayAllPagesNormally()) {
      this.pages = Array(this.pageCount);
      for (let i = 0; i < this.pages.length; i++) {
        this.pages[i] = i;
      }
      return;
    }

    // current page at the beginning
    if (this.currentPageAtTheBeginning()) {
      this.pages = Array(this.displayNearPages * 2 + 2);
      for (let i = 0; i < this.pages.length; i++) {
        this.pages[i] = i;
      }
      this.pages = this.pages.concat([-1, this.totalPages - 1]);
      return;
    }

    // current page at the end
    if (this.currentPageAtTheEnd()) {
      this.pages = [0, -1];
      for (let i = this.displayNearPages * 2 + 2; i > 0; i--) {
        this.pages.push(this.totalPages - i);
      }
      return;
    }

    // current page in the middle
    this.pages = [0, -1];
    for (let i = -this.displayNearPages; i <= this.displayNearPages; i++) {
      this.pages.push(this.currentPage + i);
    }
    this.pages = this.pages.concat([-1, this.totalPages - 1]);
  }

  private displayAllPagesNormally() {
    return this.displayNearPages * 2 + 3 > this.totalPages;
  }

  private currentPageAtTheBeginning() {
    return this.currentPage < this.displayNearPages * 2 + 1;
  }

  private currentPageAtTheEnd() {
    return this.currentPage > this.totalPages - 2 - (this.displayNearPages * 2);
  }
}