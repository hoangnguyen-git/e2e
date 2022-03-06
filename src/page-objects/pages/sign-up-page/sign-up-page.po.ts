import { element, By } from "protractor";

import { SignUpPageConstant } from "./sign-up-page.constant";

export class SignUpPage {
  static get header() {
    return element(
      By.cssContainingText("h1.text-xs-center", SignUpPageConstant.signUp)
    );
  }

  static get username() {
    return element(By.css('input[placeholder="Username"]'));
  }
}
