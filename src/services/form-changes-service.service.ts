import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormChangesService {
  private formChanged = false;

  constructor() { }

  setFormChanged(value: boolean) {
    this.formChanged = value;
  }

  getFormChanged() {
    return this.formChanged;
  }
}
