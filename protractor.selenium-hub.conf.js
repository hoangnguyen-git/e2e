const defaultConfigSetup = require('./core/config-setup/default-config-setup');
const reportersSetup = require('./core/config-setup/reporters-setup');
const UpdateTestResult = require('./core/config-setup/update-test-result-ADO').UpdateTestResult;

exports.config = {
    restartBrowserBetweenTests: defaultConfigSetup.restartBrowserBetweenTests,
    SELENIUM_PROMISE_MANAGER: defaultConfigSetup.SELENIUM_PROMISE_MANAGER,
    allScriptsTimeout: defaultConfigSetup.allScriptsTimeout,
    suites: defaultConfigSetup.suites,
    multiCapabilities: defaultConfigSetup.multiCapabilities,
    params: defaultConfigSetup.params,
    baseUrl: defaultConfigSetup.baseUrl,
    framework: defaultConfigSetup.framework,
    jasmineNodeOpts: defaultConfigSetup.jasmineNodeOpts,
    seleniumAddress: defaultConfigSetup.params.selenium.hub,
    onPrepare() {
        reportersSetup.configureAllReporters();
    }
};
