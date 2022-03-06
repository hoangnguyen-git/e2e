import { StepLogger } from "../../../../core/logger/step-logger";
import { ExpectationHelper } from "../../../component/misc-utils/expectation-helper";

import { CommonPageConstant } from "./../common-page/common-page.constant";
import { HomePageConstant } from "./home-page.constant";
import { HomePage } from "./home-page.po";

export class HomePageHelper {
  static async verifyHomePage(stepLogger: StepLogger) {
    stepLogger.subVerification("Verify brand name is displayed");
    await ExpectationHelper.verifyDisplayedStatus(
      stepLogger,
      HomePage.brandName,
      CommonPageConstant.brandName
    );
    stepLogger.subVerification("Verify your feed is displayed");
    await ExpectationHelper.verifyDisplayedStatus(
      stepLogger,
      HomePage.yourFeed,
      HomePageConstant.yourFeed
    );
    stepLogger.subVerification("Verify user icon is displayed");
    await ExpectationHelper.verifyDisplayedStatus(
      stepLogger,
      HomePage.userIcon,
      HomePageConstant.userIcon
    );
  }
}
