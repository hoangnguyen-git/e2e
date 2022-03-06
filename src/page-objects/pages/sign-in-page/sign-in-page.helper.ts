import { CommonPage } from './../common-page/common.po';
import { StepLogger } from "../../../../core/logger/step-logger";
import { PageHelper } from "../../../component/html/page-helper";
import { ExpectationHelper } from "../../../component/misc-utils/expectation-helper";

import { SignInPageConstant } from "./sign-in-page.constant";
import { SignInPage } from "./sign-in-page.po";

export class SignInPageHelper {
  static async verifySignInPage(stepLogger: StepLogger) {
    stepLogger.subVerification("Verify Sign In page is loaded");
    await ExpectationHelper.verifyDisplayedStatus(stepLogger, SignInPage.header, SignInPageConstant.signIn);
  }

  static async clickOnSignInButton(stepLogger: StepLogger) {
    stepLogger.subStep("Click on Sign In button");
    await PageHelper.click(CommonPage.signInButton);
  }

  static async verifyErrorMessage(stepLogger: StepLogger, errorMessage: string) {
    stepLogger.subStep(`Verify error message display ${errorMessage}`);
    await ExpectationHelper.verifyDisplayedStatus(stepLogger, SignInPage.errorMessage(errorMessage), errorMessage);
  }
}
