import {browser, protractor} from 'protractor';

import {PageHelper} from './page-helper';

/**
 * Alert helper for general utility
 */
export class AlertHelper {

    private static readonly EC = protractor.ExpectedConditions;

    /**
     * Wait for an alert to appear
     * @param {number} timeout in milliseconds
     * @param {string} message
     */
    public static async waitForAlertToBePresent(timeout: number = PageHelper.DEFAULT_TIMEOUT,
                                                message: string = 'Alert is not present') {
        return await browser.wait(this.EC.alertIsPresent(), timeout, message);
    }

    /**
     * Accept javascript's alert
     * @param {number} timeout in milliseconds
     * @param {string} message
     */
    public static async acceptAlert(timeout: number = PageHelper.DEFAULT_TIMEOUT,
                                    message: string = 'Alert is not present') {
        await this.waitForAlertToBePresent(timeout, message);
        return await browser.switchTo().alert().accept();
    }

    /**
     * Cancel javascript's alert
     * @param {number} timeout in milliseconds
     * @param {string} message
     */
    public static async cancelAlert(timeout: number = PageHelper.DEFAULT_TIMEOUT,
                                    message: string = 'Alert is not present') {
        await this.waitForAlertToBePresent(timeout, message);
        return await browser.switchTo().alert().dismiss();
    }

    /**
     * Handles anonymous alerts on navigating to different pages
     * @returns {Promise<void>}
     */
    public static async acceptAlertIfExists() {
        await AlertHelper.clickAcceptButtonInAlert().catch((error) => {
            console.log(error);
        });
    }

    public static async clickAcceptButtonInAlert() {
        try {
            await browser.switchTo().alert().accept();
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    public static async dismissAlertIfExists() {
        await AlertHelper.clickDismissButtonInAlert().catch((error) => {
            console.log(error);
        });
    }

    public static async clickDismissButtonInAlert() {
        try {
            await browser.switchTo().alert().dismiss();
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    public static async verifyAlert() {
        // tslint:disable-next-line:expectation-helper
        await expect(await this.isAlertPresent()).toBeTruthy('Alert is not present');
    }

    public static async isAlertPresent() {
        let isPresent = false;
        try {
            await browser.switchTo().alert().then(() => isPresent = true);
        } catch (e) {
            isPresent = false;
        }
        return isPresent;
    }
}
