import { SignUpPageHelper } from "../../page-objects/pages/sign-up-page/sign-up-page.helper";
import { StepLogger } from "../../../core/logger/step-logger";
import { PageHelper } from "../../component/html/page-helper";
import { CommonPageHelper } from "../../page-objects/pages/common-page/common-page.helper";
import { HomePageHelper } from "../../page-objects/pages/home-page/home-page.helper";
import { LandingPageHelper } from "../../page-objects/pages/landing-page/landing-page.helper";
import { SuiteNames } from "../helpers/suite-names";

import { Random } from "./../../component/misc-utils/random";
import { SignInPageHelper } from "./../../page-objects/pages/sign-in-page/sign-in-page.helper";

describe(SuiteNames.endToEndTestSuite, () => {
  let stepLogger: StepLogger;
  const landingPageHelper = new LandingPageHelper();
  const username = `automation_${Random.getRandomNumber(5)}`;
  const email = `${username}@yopmail.com`;
  let invalidLoginData = require('../../resource/TC0003InvalidLogin.json');

  beforeAll(async () => {
    stepLogger = new StepLogger();
    await PageHelper.maximizeWindow();
  });

  beforeEach(async () => {
    await landingPageHelper.goTo();
  });

  it("TC10001 - Verify that the user can create an account successfully", async () => {
    stepLogger.caseId = 10001;

    stepLogger.stepId(1);
    stepLogger.step("Click on Sign Up button");
    await LandingPageHelper.clickOnSignUpButton(stepLogger);
    stepLogger.verification("Verify that Sign Up page is load");
    await SignUpPageHelper.verifySignUpPage(stepLogger);

    stepLogger.stepId(2);
    stepLogger.step("Input all required information");
    await SignUpPageHelper.inputUsernameEmailAndPassword(stepLogger, username, email, CommonPageHelper.getPassword);

    stepLogger.stepId(3);
    stepLogger.step("Click on Sign In button");
    await CommonPageHelper.clickOnSignInButton(stepLogger);
    stepLogger.verification("Verify that Home page is displayed");
    await HomePageHelper.verifyHomePage(stepLogger);

    stepLogger.postCondition('Logout');
    await HomePageHelper.logOut(stepLogger);
  });

  it("TC10002 - Verify that a user log in successfully with username and password already signed up", async () => {
    stepLogger.caseId = 10002;

    stepLogger.stepId(1);
    stepLogger.step("Click on Sign In button");
    await LandingPageHelper.clickOnSignInButton(stepLogger);
    stepLogger.verification("Verify that Sign In page is load");
    await SignInPageHelper.verifySignInPage(stepLogger);

    stepLogger.stepId(2);
    stepLogger.step("Enter invalid email and password and click on Sign In button");
    await CommonPageHelper.inputEmailAndPassword(stepLogger, email, CommonPageHelper.getPassword);

    stepLogger.stepId(3);
    stepLogger.step("Click on Sign In button");
    await CommonPageHelper.clickOnSignInButton(stepLogger);
    stepLogger.verification("Verify that Home page is displayed");
    await HomePageHelper.verifyHomePage(stepLogger);

    stepLogger.postCondition('Logout');
    await HomePageHelper.logOut(stepLogger);
  });

  invalidLoginData.forEach((data: { email: string; password: string; errorMessage: string }, index: number) => {
    it(`TC${10003 + index} - Verify that a user cannot log in when entering a wrong email address or password`, async () => {
      stepLogger.caseId = 10003 + index;

      stepLogger.stepId(1);
      stepLogger.step("Click on Sign In button");
      await LandingPageHelper.clickOnSignInButton(stepLogger);
      stepLogger.verification("Verify that Sign In page is load");
      await SignInPageHelper.verifySignInPage(stepLogger);

      stepLogger.stepId(2);
      stepLogger.step("Enter invalid email and password and click on Sign In button");
      await CommonPageHelper.inputEmailAndPassword(stepLogger, data.email, data.password);

      stepLogger.stepId(3);
      stepLogger.step("Click on Sign In button");
      await CommonPageHelper.clickOnSignInButton(stepLogger);
      stepLogger.verification("Verify that Home page is displayed");
      await SignInPageHelper.verifyErrorMessage(stepLogger, data.errorMessage);
    });
  });
});
