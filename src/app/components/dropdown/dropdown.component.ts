import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Checkbox } from '../checkbox/checkbox.component';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
  @Input() name = '';
  @Input() checkboxes: Checkbox[] = [];
  @Output() checkboxUpdateEvent = new EventEmitter();

  checked = 0;
  isDropdownShown = false;

  ngOnInit() {
    // ? checkboxes is undefined at start, but it should be an empty array by default
    if (this.checkboxes) {
      this.checked = this.checkboxes.filter(
        (checkbox) => checkbox.checked
      ).length;
    }
  }

  handleCheckboxClick(event: Checkbox) {
    event.checked ? this.checked++ : this.checked--;

    this.checkboxUpdateEvent.emit(event);
  }

  toggleDropdown() {
    this.isDropdownShown = !this.isDropdownShown;
  }
}
