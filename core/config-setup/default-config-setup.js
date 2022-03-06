const browserList = require('./browser-list.js');
const setupUtilities = require('./setup-utilities');
const browserNameLocal = setupUtilities.getParam('chrome', '--params.local.browser', false);
const browserStackBrowser = browserList[setupUtilities.getParam('chrome', '--params.browserstack.browser', false)];
const maxBrowserInstances = process.env.MAX_INSTANCES || setupUtilities.getParam(5, '--params.maxInstances', false);
const useHeadlessBrowser = process.env.HEADLESS_BROWSER || setupUtilities.toBoolean(setupUtilities.getParam(false, '--params.headlessBrowser', false));
const chromeHeadlessArgs =
    [
        '--headless',
        '--disable-gpu',
        '--window-size=1280x800',
        '--disable-dev-shm-usage',
        '--no-sandbox',
        '--acceptInsecureCerts',
        '--ignore-certificate-errors',
        '--remote-debugging-port=9222',
        '--disable-blink-features=BlockCredentialedSubresources',
        '--disable-web-security'];

/*  ABOUT --disable-dev-shm-usage:
    By default, Docker runs a container with a /dev/shm shared memory space 64MB.
    This is typically too small for Chrome and will cause Chrome to crash when rendering large pages.
    To fix, run the container with docker run --shm-size=1gb to increase the size of /dev/shm.
    Since Chrome 65, this is no longer necessary. Instead, launch the browser with the --disable-dev-shm-usage flag
    sources:
        - https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#tips
        - https://developers.google.com/web/tools/puppeteer/troubleshooting
*/
const chromeOptions = {
    args: useHeadlessBrowser ? chromeHeadlessArgs : [],
    // Set download path and avoid prompting for download even though
    // this is already the default on Chrome but for completeness
    prefs: {
        'download': {
            'prompt_for_download': false,
            'directory_upgrade': true,
            'default_directory': 'Downloads',
        },
    },
};
const configSetup = {
    restartBrowserBetweenTests: false,
    SELENIUM_PROMISE_MANAGER: false,
    allScriptsTimeout: 600000,
    suites: {
        e2e_tests: './src/test-suites/e2e-test-suite/*-spec.ts',
    },
    capabilities: {
        'browserName': browserNameLocal,
        'chromeOptions': chromeOptions,
        acceptInsecureCerts: true,
    },
    multiCapabilities: [{
        browserName: 'chrome',
        'chromeOptions': chromeOptions,
        shardTestFiles: 'true',
        maxInstances: maxBrowserInstances,
        acceptInsecureCerts: true,
    }, {
        'browserName': 'firefox',
        'moz:firefoxOptions': {
        'args': ['--safe-mode']
          }
        },
    ],
    bsMultiCapabilities: [{
        name: `${browserStackBrowser.os} ${browserStackBrowser.os_version}-${browserStackBrowser.browserName} v ${browserStackBrowser.browser_version || 'Latest'}`,
        'browserName': browserStackBrowser.browserName,
        'browser_version': browserStackBrowser.browser_version,
        'os': browserStackBrowser.os,
        'os_version': browserStackBrowser.os_version,
        'resolution': browserStackBrowser.resolution,
        'browserstack.user': process.env.BROWSERSTACK_USERNAME || setupUtilities.getParam("hoangnguyen56", "--params.browserstack.user", false),
        'browserstack.key': process.env.BROWSERSTACK_ACCESS_KEY || setupUtilities.getParam("tsNMU55qxMVG9CRz14wK", "--params.browserstack.key", false),
        'browserstack.local': process.env.BROWSERSTACK_LOCAL || setupUtilities.getParam(true, '--params.browserstack.local', false),
        'build': process.env.BROWSERSTACK_BUILD || setupUtilities.getParam('Local Build - FirstRain - ' + new Date().toISOString(), "--params.browserstack.build", false),
        'browserstack.debug': 'true',
        'acceptSslCerts': 'true',
        'trustAllSSLCertificates': 'true',
        'browserstack.timezone': 'UTC',
        'browserstack.safari.allowAllCookies': 'true',
        shardTestFiles: true,
        maxInstances: maxBrowserInstances,
    }],
    params: {
        verboseLogging: process.env.ENABLE_VERBOSE_LOGGING || setupUtilities.getParam(false, '--params.enableVerboseLogging', false),
        maxInstances: 5,
        maxSessions: 5,
        users: {
                email: 'automation1@yopmail.com',
                password: 'Testing@123',
        },
        selenium: {
            hub: process.env.SELENIUM_URL || setupUtilities.getParam('http://localhost:4444/wd/hub', '--params.selenium.hub', false),
        },
        language: process.env.LANGUAGE || setupUtilities.getParam('English', '--params.language', false),
        browserstack: {
            user: '', //Don't specify anything here it's just for a reference purpose that it can be a param
            key: '',//Don't specify anything here it's just for a reference purpose that it can be a param
            local: '',//Don't specify anything here it's just for a reference purpose that it can be a param
            localIdentifier: '',//Don't specify anything here it's just for a reference purpose that it can be a param
            build: '',//Don't specify anything here it's just for a reference purpose that it can be a param
        },

    },
    baseUrl: process.env.INSTANCE_URL || 'https://react-redux.realworld.io',
    framework: 'jasmine',

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 600000,
        print: function () {
        },
    },
};
module.exports = configSetup;
