import { browser } from "protractor";
import { PageHelper } from "../../../component/html/page-helper";
import { StepLogger } from "../../../../core/logger/step-logger";
import { CommonPage } from "./common.po";

export class CommonPageHelper {
    static get getEmail(): string {
        return browser.params.users.email;
    }

    static get getPassword(): string {
        return browser.params.users.password;
    }

    static async inputEmailAndPassword(
        stepLogger: StepLogger,
        email: string,
        password: string
    ) {
        stepLogger.subStep(`Input Email ${email}`);
        await PageHelper.sendKeysToInputField(CommonPage.email, email);
        stepLogger.subStep(`Input password ${password}`);
        await PageHelper.sendKeysToInputField(CommonPage.password, password);
    }

    static async clickOnSignInButton(stepLogger: StepLogger) {
        stepLogger.subStep("Click on Sign In button");
        await PageHelper.click(CommonPage.signInButton);
    }
}
