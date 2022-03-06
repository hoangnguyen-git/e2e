/**
 * This class helps in causing the current thread to suspend execution for a specified period
 */
import {browser} from 'protractor';

export class StaticWaitHelper {

    /**
     * This method causes the currently executing thread to sleep for the specified number of seconds
     * @param {number} s
     * @returns {Promise<any>}
     */
    static async waitForSec(s = 0) {
        return await browser.sleep(s * 1000);
    }

    /**
     * This method causes the currently executing thread to sleep for the specified number of minutes
     * @param {number} m
     * @returns {Promise<any>}
     */
    static async waitForMinute(m = 0) {
        return await browser.sleep( m * 1000 * 60);
    }

    /**
     * This method causes the currently executing thread to sleep for the specified number of milliseconds
     * @param {number} ms
     * @returns {Promise<any>}
     */
    static async waitForMillSec(ms = 0) {
        return await browser.sleep(ms);
    }
}
