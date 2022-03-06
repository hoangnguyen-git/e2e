import {ElementFinder} from 'protractor';

import {WaitHelper} from './wait-helper';

export class CheckboxHelper {
    static async markCheckbox(elementt: ElementFinder, markChecked: boolean) {
        await WaitHelper.waitForElementToBeClickable(elementt);

        const isSelected = await elementt.isSelected();
        if (isSelected !== markChecked) {
            await elementt.click();
        }
        return;
    }

    static async isCheckboxChecked(locator: ElementFinder) {
        await WaitHelper.waitForElementToBeDisplayed(locator);
        return locator.isSelected();
    }
}
