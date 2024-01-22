import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {UserSelectors } from 'src/store';

@Component({
  selector: 'app-qm-clear-input-button',
  templateUrl: './qm-clear-input-button.component.html',
  styleUrls: ['./qm-clear-input-button.component.scss'],
})
export class QmClearInputButtonComponent implements OnInit {
  @Input() isVisible: Boolean = false;
  @Input() inputname: String = '';
  userDirection$!: Observable<string>;
  private subscriptions: Subscription = new Subscription();
  public isRtl!: boolean;

  // isVisible: Boolean = false;

  // @Output() clear: EventEmitter<any> = new EventEmitter();
  @Output() clear = new EventEmitter<any>();
  constructor(private userSelectors: UserSelectors) {
    this.userDirection$ = this.userSelectors.userDirection$;
  }

  ngOnInit(): void {
    this.setRtlStyles();
  }

  buttonClicked($event: any) {
    this.clear.emit({ input_name: this.inputname });
    $event.preventDefault();
    $event.stopPropagation();

    // this.isVisible = !this.isVisible;
  }

  setRtlStyles() {
    const userDirectionSubscription = this.userDirection$.subscribe((data) => {
      if (data === 'rtl') {
        this.isRtl = true;
      } else {
        this.isRtl = false;
      }
    });
    this.subscriptions.add(userDirectionSubscription);
  }
}
