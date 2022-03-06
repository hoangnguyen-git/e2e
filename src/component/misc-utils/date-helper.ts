import moment = require('moment');

import {StepLogger} from '../../../core/logger/step-logger';

export class DateHelper {

    static getCurrentDateInSpecifiedFormat(stepLogger: StepLogger, format: string) {
        stepLogger.subStep(`Fetch today's date with format: ${format}`);
        return moment(new Date(), format).format(format);
    }

    static getDateInSpecifiedFormat(stepLogger: StepLogger, format: string, dateObj: Date) {
        stepLogger.subStep(`Fetch given date with format: ${format}`);
        return moment(dateObj, format).format(format);
    }

    static getCurrentDate(stepLogger: StepLogger) {
        stepLogger.subStep("Fetch today's date");
        return moment(new Date());
    }

    static addDaysToDate(stepLogger: StepLogger, date: string, format: string, daysToAdd: number) {
        stepLogger.subStep(`Adding days: ${daysToAdd} to date: ${date} with format: ${format}`);
        const day = moment(date, format);
        return day.add(daysToAdd, 'days').format(format);
    }

    static getEpochMillis(stepLogger: StepLogger, date: string, format: string) {
        stepLogger.subStep(`Fetching Epoch Milliseconds for date: ${date} with format: ${format}`);
        return moment(date, format).valueOf();
    }
}
