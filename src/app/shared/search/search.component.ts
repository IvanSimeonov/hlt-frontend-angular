import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {fromEvent, Subscription} from "rxjs";
import {debounceTime, distinctUntilChanged, map} from "rxjs/operators";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  @Output() searchNameChanged = new EventEmitter<string>();

  private subscriptions: Array<Subscription> = [];

  constructor() { }

  ngOnInit() {

    const element = document.getElementById('searchInput');

    this.subscriptions.push(fromEvent(element, 'input').pipe(
      map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(value => {
      console.log('SEARCHED VALUE CHANGED TO: ' + value);
      this.searchNameChanged.emit(value);
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
