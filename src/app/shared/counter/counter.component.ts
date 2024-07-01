import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCount } from '../../states/counter/counter.selector';
import { AppState } from '../../states/app.state';
import { AsyncPipe } from '@angular/common';
import { decrement, increment, reset } from '../../states/counter/counter.action';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent {
  count$: Observable<number>;

  constructor(private store: Store<AppState>){
    this.count$ = this.store.select(selectCount);
  }

  increaseCount() {
    this.store.dispatch(increment());
  }

  resetCount() {
    this.store.dispatch(reset());
  }
  
  decreaseCount() {
    this.store.dispatch(decrement());
  }
}
