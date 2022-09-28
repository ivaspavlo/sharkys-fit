import { Component, ChangeDetectionStrategy, Input, ViewChild, TemplateRef } from '@angular/core';
import { ITableData } from '../../interfaces';


@Component({
  selector: '[app-table-data]',
  templateUrl: './table-data.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableDataComponent {
  @Input() set data(value: ITableData) {
    this.setSize(value);
    this.setText(value);
  }

  @ViewChild('templateRef', { static: true }) templateRef: TemplateRef<any>;

  public size: any = null;
  public text: any = null;

  constructor() {}

  private setSize(value: ITableData): void {
    this.size = value?.width ? { 'width.%': value.width } : null;
  }

  private setText(value: ITableData): void {
    this.text = value?.text || null;
  }
}
