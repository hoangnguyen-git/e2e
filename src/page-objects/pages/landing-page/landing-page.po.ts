import { element, By } from "protractor";

import { CommonPageConstant } from "./../common-page/common-page.constant";
import { LandingPageConstant } from "./landing-page.constant";

export class LandingPage {
  static get signInButton() {
    return element(By.linkText("Sign in"));
  }

  static get signUpButton() {
    return element(By.linkText("Sign up"));
  }

  static get logo() {
    return element(
      By.cssContainingText("logo-font", CommonPageConstant.brandName)
    );
  }

  static get slogan() {
    return element(By.xpath(`//p[text()="${LandingPageConstant.slogan}"]`));
  }
}
