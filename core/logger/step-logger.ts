import * as log4js from 'log4js';
import {Logger} from 'log4js';

declare var allure: any;

export class StepLogger {
    logger: Logger;
    stepIdVar = '';
    id: number;
    testCaseId: number;
    logMessages = '';

    constructor(private debug = process.env.DEBUG || true) {
        this.id = 0;
    }

    set caseId(theCaseId: number) {
        this.testCaseId = theCaseId;
        this.logger = log4js.getLogger(`C${theCaseId}`);
        this.logger.debug(this.logMessages);
        this.id = 1;
        this.logMessages = '';
    }

    step(stepName: string) {
        let operation = 'Pre-Condition';
        if (this.testCaseId) {
            // this.stepId();
            operation = 'Step';
        }
        this.commonLogger(operation, stepName);
    }

    stepId(optionalId = 0) {
        this.id = optionalId > 0 ? optionalId : this.id + 1;
        this.commonLogger('Step Id', this.id.toString());
    }

    commonLogger(operation: string, step: string) {
        const message = `${this.stepIdVar}- *${operation}* - ${step}`;
        if (this.debug) {
            console.log(`${this.testCaseId || ''}${message}`);
        }
        if (!process.env.NO_ALLURE) {
            // tslint:disable-next-line:no-empty
            allure.createStep(message, () => {
            })();
        }
        if (this.logger) {
            this.logger.debug(message);
        } else {
            this.logMessages += message;
        }
    }

    verification(verificationDescription: string) {
        this.commonLogger('Verification', verificationDescription);
    }

    /**
     * Called for any precondition related step-log shown towrds Spec file, never used anywhere else such as validation/helper
     * @param {string} preConditionDescription
     */
    public preCondition(preConditionDescription: string) {
        this.commonLogger('Pre-Condition', preConditionDescription);
    }

    public postCondition(postConditionDescription: string) {
        this.commonLogger('Post-Condition', postConditionDescription);
    }

    /**
     * Called wherever a helper/validation method need to have a step/action step significant enough to log
     * @param {string} stepName
     */
    subStep(stepName: string) {
        this.commonLogger('Sub-Step', stepName);
    }

    /**
     * Called wherever a helper/validation method need to have a verification step significant enough to log
     * @param {string} verificationDescription
     */
    subVerification(verificationDescription: string) {
        this.commonLogger('Sub-Verification', verificationDescription);
    }
}
