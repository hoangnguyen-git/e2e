import { element, By } from "protractor";

import { CommonPageConstant } from "./../common-page/common-page.constant";
import { HomePageConstant } from "./home-page.constant";

export class HomePage {
  static get brandName() {
    return element(
      By.cssContainingText("a.navbar-brand", CommonPageConstant.brandName)
    );
  }

  static get yourFeed() {
    return element(By.xpath(`//a[text() = "${HomePageConstant.yourFeed}"]`));
  }

  static get userIcon() {
    return element(By.className("user-pic"));
  }

  static get setting() {
    return element(By.partialLinkText("Settings"));
  }

  static get logOut() {
    return element(By.className("btn-outline-danger"));
  }
}
