import {by, ElementFinder} from 'protractor';

export class TableHelper {
  /**
   * webtable
   */
  webTable: ElementFinder;

  constructor(webTableElement: ElementFinder) {
    this.webTable = webTableElement;
  }

  /**
   * get the number of rows present
   */

  public getRowCount() {
    return this.webTable.all(by.css('tr')).count();
  }

  /**
   * get the number of columns present
   */

  public getColumnCount() {
    return this.webTable.all(by.css('th')).count();
    // if you do not have header then above will not work
    // use this if no header is there
    // return this.webTable.all(by.xpath("//tr[0]/td")).count()
  }

  /**
   * get the number of rows and columns and return it as Map
   */

  public getTableSize() {
    return {
      row: this.webTable.all(by.css('tr')).count(),
      columns: this.webTable.all(by.css('th')).count()
    };
  }

  /**
   * get row data and return it as list
   */

  public rowData(rowNumber: number) {
    if (rowNumber === 0) {
      throw new Error('Row number starts from 1');
    }
    rowNumber = rowNumber + 1;
    return this.webTable.all(by.xpath(`//tr[${rowNumber}]/td`)).getText();
  }

  /**
   * get the column data and return as list
   */

  public columnData(columnNumber: number) {
    if (columnNumber === 0) {
      throw new Error('Column number starts from 1');
    }
    columnNumber = columnNumber + 1;
    return this.webTable.all(by.xpath(`//tr/td[${columnNumber}]`)).map((option => option.getText()));
  }

  /**
   * get the index of specific column in the table
   */

  public getColumnPositionWithColumnHeader(columnHeader: string) {
    return this.webTable.all(by.xpath(`//tr/th[contains(.,'${columnHeader}')]/preceding-sibling::*`)).count();
  }

  /**
   * get all the data from the table
   */

  public getAllData() {
    return this.webTable.all(by.xpath('//td')).getText();
  }

  /**
   * verify the data by getting the size of the element matches based on the text/data passed
   */

  public presenceOfData(data: string) {
    const exist = this.webTable.all(by.xpath(`//td[normalize-space(text())='${data}']`)).size();
    return exist > 0;
  }

  /**
   * get the data from a specific cell
   */

  public getCellData(rowNumber: number, columnNumber: number) {
    if (rowNumber === 0) {
      throw new Error('Row number starts from 1');
    }
    rowNumber = rowNumber + 1;
    return this.webTable.element(by.xpath(`//tr[${rowNumber}]/td[${columnNumber}]`)).getText();
  }

  /**
   * click on first row of table
   */

  public clickOnFirstRow() {
    return this.webTable.all(by.xpath('//tbody/tr[1]')).click();
  }

  public clickOnRowWithSpecificData(data: string) {
    return this.webTable.all(by.xpath(`//td[normalize-space(text())='${data}']`)).first().click();
  }
}
