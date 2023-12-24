import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() dataAlbaran: any = new EventEmitter<any>();
  @Output() updateItem: any = new EventEmitter<any>();
  @Output() deleteItem: any = new EventEmitter<any>();
  constructor() {}
  ngOnInit() {}

  actualizarItem(item: any, i: number) {
    this.updateItem.emit({ item, i });
  }

  eliminarItem(item: any, i: number) {
    this.deleteItem.emit({ item, i });
  }
}
