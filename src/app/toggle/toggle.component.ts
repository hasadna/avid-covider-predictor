import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.less']
})
export class ToggleComponent implements OnInit, OnChanges {

  @Input() text: string;
  @Input() field: string;
  @Input() von: any;
  @Input() voff: any;
  @Input() record: any;
  @Output() changed = new EventEmitter<void>();

  active = false;

  constructor() { }

  ngOnChanges() {
    this.active = this.record[this.field] === this.von;
  }

  ngOnInit() {
    if (this.voff !== undefined) {
      this.record[this.field] = this.voff;
      this.active = false;
    }
  }

  toggle() {
    if (!this.active) {
      this.record[this.field] = this.von;
    } else {
      if (this.voff !== undefined) {
        this.record[this.field] = this.voff;
      }
    }
    this.changed.emit();
  }

}
