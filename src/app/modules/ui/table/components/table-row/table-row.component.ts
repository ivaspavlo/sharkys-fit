import { Component, ChangeDetectionStrategy, ContentChildren, QueryList, Output, EventEmitter } from '@angular/core';
import { TableDataComponent } from '../table-data/table-data.component';


@Component({
  selector: '[app-table-row]',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableRowComponent {

  @ContentChildren(TableDataComponent, { descendants: true }) tDataElements: QueryList<TableDataComponent>;

  @Output() clickRow: EventEmitter<any> = new EventEmitter();

  constructor() {}

  public onClickRow(rowData: any): void {
    this.clickRow.emit(rowData);
  }

}
