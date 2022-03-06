import { StepLogger } from "../../../../core/logger/step-logger";
import { PageHelper } from "../../../component/html/page-helper";
import { ExpectationHelper } from "../../../component/misc-utils/expectation-helper";

import { CommonPageHelper } from "./../common-page/common-page.helper";
import { SignUpPageConstant } from "./sign-up-page.constant";
import { SignUpPage } from "./sign-up-page.po";

export class SignUpPageHelper {
  static async verifySignUpPage(stepLogger: StepLogger) {
    stepLogger.subVerification("Verify Sign In page is loaded");
    await ExpectationHelper.verifyDisplayedStatus(
      stepLogger,
      SignUpPage.header,
      SignUpPageConstant.signUp
    );
  }

  static async inputUsernameEmailAndPassword(
    stepLogger: StepLogger,
    username: string,
    email: string,
    password: string
  ) {
    stepLogger.subStep(`Input username ${username}`);
    await PageHelper.sendKeysToInputField(SignUpPage.username, username);
    stepLogger.subStep("Input username and password");
    await CommonPageHelper.inputEmailAndPassword(stepLogger, email, password);
  }
}
