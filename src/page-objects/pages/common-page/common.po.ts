import { element, By } from "protractor";

export class CommonPage {
  static get loading() {
    return element(By.xpath('//div[contains(text(), "Loading")]'));
  }

  static get email() {
    return element(By.css('input[placeholder="Email"]'));
  }

  static get password() {
    return element(By.css('input[placeholder="Password"]'));
  }

  static get signInButton() {
    return element(By.css('button[type="submit"]'));
  }
}
