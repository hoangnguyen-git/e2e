import { element, By } from "protractor";

import { SignInPageConstant } from "./sign-in-page.constant";

export class SignInPage {
  static get header() {
    return element(
      By.cssContainingText("h1.text-xs-center", SignInPageConstant.signIn)
    );
  }

  static errorMessage(message: string) {
    return element(By.cssContainingText("  ul.error-messages", message));
  }
}
