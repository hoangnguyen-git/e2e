import {By, ElementFinder} from 'protractor';

import {CommonPage} from '../../page-objects/pages/common-page/common.po';

import {PageHelper} from './page-helper';
import {WaitHelper} from './wait-helper';

export class DropDownHelper {
    static selectOptionByVal(locator: ElementFinder, optionVal: string) {
        // tslint:disable-next-line:no-element-outside-page-class
        return locator.element(By.css(this.getCssForOptionValue(optionVal))).click();
    }

    static getCssForOptionValue(optionVal: string) {
        return `option[value="${optionVal}"]`;
    }

    static async selectOptionByText(locator: ElementFinder, optionVal: string) {
        await WaitHelper.waitForElementToBeDisplayed(locator);
        await PageHelper.click(CommonPage.getDropdownOptionByValue(locator, optionVal));
    }
}
