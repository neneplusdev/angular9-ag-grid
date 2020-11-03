import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('agGrid') agGrid: AgGridAngular;
  title = 'ag-grid-demo';
  columnDefs = [
    { field: 'make', sortable: true, filter: true, checkboxSelection: true },
    { field: 'model', sortable: true, filter: true },
    { field: 'price', sortable: true, filter: true, editable: true }
  ];
  rowData: any;
  layout: any = "ag-theme-alpine";

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.rowData = this.http.get(
      'https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/sample-data/smallRowData.json'
    );
  }
  
  getSelectedRows() {
    const selectedData = this.agGrid.api.getSelectedNodes().map(node => node.data);
    console.log(" selectedData ", selectedData.length);
    if (!selectedData.length) {
      alert('Please select row.');
      return;
    }
    const selectedDataStringPresentation = selectedData.map(node => node.make + ' ' + node.model).join(', ');
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }
}
