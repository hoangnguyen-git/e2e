import {protractor, ElementFinder} from 'protractor';

import {StaticWaitHelper} from '../misc-utils/static-wait-helper';

import {PageHelper} from './page-helper';
import {WaitHelper} from './wait-helper';

export class TextboxHelper {
    /**
     * Clears the existing text from an input elements
     * @param {ElementFinder} locator
     */
    public static async clearText(locator: ElementFinder) {
        await locator.clear();
    }

    /**
     * Send Keys to an input elements once it becomes available
     * @param {ElementFinder} locator for element
     * @param {string} value to be sent
     * @param {boolean} sendEnter for sending an enter key
     */
    public static async sendKeys(locator: ElementFinder,
                                 value: string,
                                 sendEnter = false,
                                 timeout = PageHelper.DEFAULT_TIMEOUT) {
        await WaitHelper.waitForElementToBeDisplayed(locator, timeout);
        await this.clearText(locator);

        // On IE, text is sometimes not well sent, this is a workaround
        await locator.sendKeys(value);
        if (sendEnter) {
            await locator.sendKeys(protractor.Key.ENTER);
        }
    }

    /**
     * Checks whether an input box has particular value or not
     * @param {ElementFinder} locator
     * @param {string} text
     * @returns {PromiseLike<boolean> | Promise<boolean> | Q.Promise<any> | promise.Promise<any> | Q.IPromise<any>}
     */
    public static async hasValue(locator: ElementFinder, text: string) {
        const val = await PageHelper.getAttributeValue(
            locator,
            'value'
        );
        return val === text;
    }

    /**
     * Adds a delay while typing text into the textbox
     * @param {ElementFinder} elm
     * @param {string} keys
     * @param {number} delay
     * @returns {Promise<void>}
     */
    public static async typeSlowly(elm: ElementFinder, keys: string, delay = 50) {
        await WaitHelper.waitForElementToBeDisplayed(elm);
        await PageHelper.click(elm);
        await TextboxHelper.clearText(elm);
        for (let i = 0; i < keys.length; i++) {
            await elm.sendKeys(keys[i]);
            await StaticWaitHelper.waitForMillSec(delay);
        }
    }

    public static async containValue(locator: ElementFinder, text: string) {
        const val = await PageHelper.getAttributeValue(
            locator,
            'value'
        );
        return val.includes(text);
    }
}
