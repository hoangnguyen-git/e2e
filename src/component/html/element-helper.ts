// tslint:disable:no-element-outside-page-class
import {browser, by, element, protractor, By, ElementFinder} from 'protractor';

import {StepLogger} from '../../../core/logger/step-logger';
import {Constants} from '../misc-utils/constants';
import {StaticWaitHelper} from '../misc-utils/static-wait-helper';

import {PageHelper} from './page-helper';
import {WaitHelper} from './wait-helper';

export class ElementHelper {
    private static readonly EC = protractor.ExpectedConditions;

    static async getBrowser() {
        const capabilities = await browser.getCapabilities();
        return capabilities.get('browserName');
    }

    static async actionMouseMove(item: ElementFinder, toWait = false, timeout = PageHelper.timeout.s) {
        if (toWait) {
            await StaticWaitHelper.waitForMillSec(timeout);
        }
        await WaitHelper.waitForElementToBeDisplayed(item);
        return browser.actions().mouseMove(item).perform();
    }

    static async actionMouseDown(item: ElementFinder) {
        await WaitHelper.waitForElementToBeDisplayed(item);
        return browser.actions().mouseDown(item).perform();
    }

    static async actionDragAndDrop(source: ElementFinder, destination: ElementFinder) {
        return browser.actions().dragAndDrop(source, destination).perform();
    }

    static async actionDoubleClick(optElementOrButton ?: ElementFinder | string, optButton ?: string) {
        if (optElementOrButton) {
            return browser.actions().doubleClick(optElementOrButton).perform();
        }
        if (optButton) {
            return browser.actions().doubleClick(optButton).perform();
        }
    }

    static async actionClick(optElementOrButton ?: ElementFinder | string, optButton ?: string) {
        if (optElementOrButton) {
            return browser.actions().click(optElementOrButton).perform();
        }
        if (optButton) {
            return browser.actions().click(optButton).perform();
        }
    }

    static async actionHoverOver(locator: ElementFinder) {
        return browser.actions().mouseMove(locator).perform();
    }

    static async actionHoverOverAndClick(hoverOverLocator: ElementFinder, clickLocator = hoverOverLocator) {
        return browser.actions().mouseMove(hoverOverLocator).click(clickLocator).perform();
    }

    static async hasOption(select: ElementFinder, option: string) {
        return await select
            .element(by.cssContainingText('option', option))
            .isPresent();
    }

    static async selectOption(select: ElementFinder, option: string) {
        return await select
            .element(by.xpath(`./option[text()='${option}']`))
            .click();
    }

    static async getFocusedElement() {
        return browser
            .driver
            .switchTo()
            .activeElement();
    }

    static async currentSelectedOptionByText(text: string) {
        const selector = `//option[@selected="selected" and normalize-space(.)="${text}"]`;
        return element(By.xpath(selector));
    }

    static async currentSelectedOptionByValueAndTrueAttribute(text: string) {
        const selector = `//option[@true and @value='${text}']`;
        return element(By.xpath(selector));
    }

    static async getSelectedOption(select: ElementFinder) {
        return select.element(By.css('option[selected]'));
    }

    static async isVisible(locator: ElementFinder) {
        return this.EC.visibilityOf(locator);
    }

    static async isNotVisible(locator: ElementFinder) {
        return this.EC.invisibilityOf(locator);
    }

    static async inDom(locator: ElementFinder) {
        return this.EC.presenceOf(locator);
    }

    static async notInDom(locator: ElementFinder) {
        return this.EC.stalenessOf(locator);
    }

    static async isClickable(locator: ElementFinder) {
        return this.EC.elementToBeClickable(locator);
    }

    static async hasText(locator: ElementFinder, text: string) {
        return this.EC.textToBePresentInElement(locator, text);
    }

    static async titleIs(title: string) {
        return this.EC.titleIs(title);
    }

    static async getClassAttribute(targetElement: ElementFinder) {
        await WaitHelper.waitForElementToBeDisplayed(targetElement);
        const classAttribute = await targetElement.getAttribute('class');
        return classAttribute;
    }

    static async getColor(targetElement: ElementFinder) {
        const colorAttribute = await this.getCssValue(targetElement, 'color');
        return colorAttribute;
    }

    static async getCssValue(targetElement: ElementFinder, css: string) {
        const cssValue = await targetElement.getCssValue(css);
        return cssValue;
    }

    static async hasClass(locator: ElementFinder, className: string) {
        const classes = await this.getClassAttribute(locator);
        return classes && classes.split(' ').indexOf(className) !== -1;
    }

    static async hasClassRegex(locator: ElementFinder, className: string) {
        const classAttribute = await this.getClassAttribute(locator);
        const pattern = new RegExp('(^|\\s)' + className + '(\\s|$)');
        return pattern.test(classAttribute);
    }

    static async click(targetElement: ElementFinder) {
        await WaitHelper.waitForElementToBeClickable(targetElement);
        return targetElement.click();
    }

    static async clickIfPresent(targetElement: ElementFinder) {
        const isPresent = await targetElement.isPresent();
        if (isPresent) {
            return this.click(targetElement);
        }
        return;
    }

    static async clickUsingJs(targetElement: ElementFinder) {
        await WaitHelper.waitForElementToBeClickable(targetElement);
        return this.clickUsingJsNoWait(targetElement);
    }

    static async clickUsingJsNoWait(targetElement: ElementFinder) {
        return browser.executeScript('arguments[0].click();', await targetElement.getWebElement());
    }

    static async waitForElementToHaveClass(targetElement: ElementFinder,
                                           kClass: string,
                                           timeout = PageHelper.DEFAULT_TIMEOUT,
                                           message = '') {
        return WaitHelper.waitForElementToResolve(
            () => this.hasClass(targetElement, kClass),
            (result: any) => result, timeout, message);
    }

    static async selectDropDownByIndex(elementt: ElementFinder, optionNum: number) {
        if (optionNum) {
            const options = await elementt.findElements(by.tagName('option'));
            await options[optionNum].click();
        }
    }

    static async scrollToElement(elementt: ElementFinder, offset = String(Constants.number.zero)) {
        await WaitHelper.waitForElementToBePresent(elementt);
        await browser.executeScript(`arguments[0].scrollIntoView(true); window.scrollBy(0,${offset});`, elementt);
        await StaticWaitHelper.waitForMillSec(PageHelper.timeout.xxs);
    }

    static async scrollToElementInsideCenterContainer(containerID: string, elementt: ElementFinder) {
        await WaitHelper.waitForElementToBePresent(elementt);
        await browser.executeScript(`document.getElementById('${containerID}').scrollIntoView(true);`, elementt);
    }

    static async scrollToElementByCoordinates(elementt: ElementFinder, yOffset = 50, toWait = true) {
        await WaitHelper.waitForElement(elementt);
        const location = await elementt.getLocation();
        await browser.executeScript(`scroll(${location.x},${(location.y - yOffset)});`);
        if (toWait) {
            await StaticWaitHelper.waitForMillSec(PageHelper.timeout.xs);
        }
    }

    static async getAttributeValue(elem: ElementFinder, attribute: string) {
        const value = await elem.getAttribute(attribute);
        return value.trim();
    }

    /**
     * This method helps in fetching attributes using javascript
     * it uses following script to fetch the attributes: 'return arguments[0].@attrtibute;'
     * @param {ElementFinder} targetElement
     * @param {string} attribute
     * @param {string} placeHolder
     * @returns {Promise<any>}
     */
    static async getAttributeUsingJS(targetElement: ElementFinder, attribute: string, placeHolder = '%s') {
        const script = `return arguments[0].${placeHolder};`.replace(placeHolder, attribute);
        await WaitHelper.waitForElementToBeDisplayed(targetElement);
        return browser.executeScript(script, targetElement);
    }

    static async getText(elem: ElementFinder) {
        await WaitHelper.waitForElementToHaveText(elem);
        const text = await elem.getText();
        return text.trim();
    }

    static async getValue(elem: ElementFinder) {
        const value = await this.getAttributeValue(elem, 'value');
        return value;
    }

    static async openLinkInNewTabUsingTarget(targetElement: ElementFinder) {
        const script = 'const item = arguments[0];item.setAttribute("target", "_blank");item.click()';
        await browser.executeScript(script, await targetElement.getWebElement());
    }

    static async openLinkInNewTabUsingWindowOpener(targetElement: ElementFinder) {
        const script = 'return window.open(arguments[0].getAttribute("href"),"_blank")';
        await browser.executeScript(script, await targetElement.getWebElement());
    }

    static async sortTableColumn(stepLogger: StepLogger, columnHeader: ElementFinder, expectedOrder: string) {
        stepLogger.subStep('Wait for element to be displayed');
        await WaitHelper.waitForElementToBeDisplayed(columnHeader);
        stepLogger.subStep('Sort table');
        while (!await this.isOrderCorrect(columnHeader, expectedOrder)) {
            await this.click(columnHeader);
            stepLogger.subStep('Wait for sorting function return result');
            await StaticWaitHelper.waitForMillSec(PageHelper.timeout.m);
        }
    }

    static async isOrderCorrect(columnHeader: ElementFinder, expectedOrder: string) {
        const classAttribute = await this.getClassAttribute(columnHeader);
        return classAttribute.includes(expectedOrder);
    }

    static async isDisabled(targetElement: ElementFinder) {
        const disabledAttr = await targetElement.getAttribute('disabled');
        return disabledAttr != null;
    }

    /**
     * This method switches the driver context to iFrame...
     * sometimes if StaticWait is not provided, then driver does not move context to iframe
     * @param {ElementFinder} elem
     * @param {Function} fn - your implementation
     * @param {number} wait - driver to wait before switching context to iFrame
     * @returns {Promise<void>}
     */
    static async executeInFrame(elem: ElementFinder, fn: Function, wait = Constants.number.two) {
        await WaitHelper.waitForElement(elem);
        await browser.driver.switchTo().frame(await elem.getWebElement());
        if (wait > 0) {
            await StaticWaitHelper.waitForSec(wait);
        }
        await fn();
        await browser.driver.switchTo().defaultContent();
    }
}
