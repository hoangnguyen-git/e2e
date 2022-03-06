import { StepLogger } from "../../../../core/logger/step-logger";
import { PageHelper } from "../../../component/html/page-helper";
import { ExpectationHelper } from "../../../component/misc-utils/expectation-helper";
import { BasePageHelper } from "../base-page.helper";
import { CommonPage } from "../common-page/common.po";

import { WaitHelper } from "./../../../component/html/wait-helper";
import { CommonPageConstant } from "./../common-page/common-page.constant";
import { LandingPageConstant } from "./landing-page.constant";
import { LandingPage } from "./landing-page.po";

export class LandingPageHelper extends BasePageHelper {
  static async verifyLandingPage(stepLogger: StepLogger) {
    stepLogger.subStep("Wait for loading");
    await WaitHelper.waitForElementToBeHidden(CommonPage.loading);
    stepLogger.subVerification("Verify brand name is displayed");
    await ExpectationHelper.verifyDisplayedStatus(
      stepLogger,
      LandingPage.logo,
      CommonPageConstant.brandName
    );
    stepLogger.subVerification("Verify slogan is displayed");
    await ExpectationHelper.verifyDisplayedStatus(
      stepLogger,
      LandingPage.slogan,
      LandingPageConstant.slogan
    );
  }

  static async clickOnSignInButton(stepLogger: StepLogger) {
    stepLogger.subStep("Click on Sign In button");
    await PageHelper.click(LandingPage.signInButton);
  }

  static async clickOnSignUpButton(stepLogger: StepLogger) {
    stepLogger.subStep("Click on Sign Up button");
    await PageHelper.click(LandingPage.signUpButton);
  }

  url(): string {
    return "/";
  }
}
