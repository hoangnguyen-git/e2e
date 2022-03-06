## *Important note*
If you are working on angular app automation then don't forget to remove
browser.waitForAngularEnabled(false); e2e\page-objects\pages\base-page.ts Line-10

## Code organization

For integration tests the folder structure should be similar to this as our spec files are going to utilize multiple page objects for completing a test
```
─e2e
    │   tsconfig.e2e.json
    │
    ├───components
    │   ├───devfactory
    │   │   ├───component-helpers
    │   │   │       component-helpers.ts
    │   │   │
    │   │   └───component-types
    │   │       └───(component-name)-component
    │   │    breadcrumbs-component-selectors.ts
    │   │
    │   ├───html
    │   │       (type)-helper.ts
    │   │
    │   ├───misc-utils
    │   │       common-label.ts
    │   │       constants.ts
    │   │       html-helper.ts
    │   │
    │   └───vendor
    │       └───vendor-name
    │    vendor-name.ts
    │
    ├───page-objects
    │   ├───contracts
    │   │       page.ts
    │   │
    │   └───pages
    │       │   base-page.ts
    │       │
    │       └───(page-name)
    │               (page-name)-page.constants.ts
    │               (page-name)-page.helper.ts
    │               (page-name).po.ts
    │
    └───test-suites
        ├───(suite-name)-test-suite
        │   └───(root-after-suite)
        │
        └───helpers
     suite-names.ts
```

## Framework components


### Contracts

e2e\modules\Contracts are basically a kind of interface, like those things which are compulsory to be implemented by every page object file. Right now we have it for Page, so whatever is declared in it is a unified requirement for all the components that should be put in here. So this `Page` contract has to be inherited by all the page objects


### Base Page

e2e\page-objects\base-page it's basically a utility for all the tricky selectors so this page has to be inherited by all the page objects

### Naming convention
We are using default conventions which are suggested by angular team on top of that we are also using some more configuration parameters to produce high quality code.
https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines


### Spec files
We must post fix `.e2e-spec.ts` for all the test files

## Docker execution
We have a Dockerfile created in root of the repo for test execution in interactive mode and usage VNC for debugging as well.


## Running end-to-end tests
Install libraries, dependencies
```
npm install
```

Execute the end-to-end tests via [Protractor] on local(http://www.protractortest.org/). Default is Chrome
```
npm run e2e
```
Run in headless mode of Chrome on local
```
npm run e2e -- --params.headlessBrowser='true'
```
Run with Firefox on local
```
npm run e2e -- --params.local.browser='firefox'
```

Execute the end-to-end tests via [Protractor] with Selenium Grid
```
npm run e2e-selenium
```

Execute the end-to-end tests via [Protractor] on Browser Stack. Default is Chrome with latest version
```
npm run e2e-bs
```
Note here the list browser available in `browser-list.js` (https://github.com/hoangnguyen-git/e2e/blob/main/core/config-setup/browser-list.js). You can define more depend on the need
If you want to run with different browser, browser version, OS. You can define and pass it to the param in run command
Example to run with Firefox 80 on MacOS
```
  firefoxMac80: {
    browserName: 'Firefox',
    browser_version: 80,
    os: 'OS X',
    os_version: 'Big Sur',
    resolution: '1280x1024',
  }
```
```
npm run e2e-bs -- --params.browserstack.browser='firefoxMac80'
```

## Customization switches

Almost all the switches are configurable using Environment variable, Check the respective section for more details

### Passing parameters to NPM

NPM scripts can have parameters passed by command line.  E.g.:

```
// Notice extra -- with cmd line args
npm run e2e -- --baseUrl=<URL>

OR

protractor <conf-file> --baseUrl=<URL>
```


Following sections defines which parameters are accepted by Protractor

### Selenium hub switch
--params.selenium.hub Or process.env.SELENIUM_URL

Default - as Required


### Protractor switches

Browser stack related configuration can be passed command line and following options are available

--params.browserstack.user='bs-username'

--params.browserstack.key='bs-key'

--params.browserstack.local=[true|false]

Default is true

--params.browserstack.browser=browserName
Default is Chrome

Default browser names are available `Chrome`, `Firefox`, `IE`, `IE10`, `IE11`, `Edge`, `Safari`, `Safari9`

We can also have them using environment variables, Following keys are used for their respective values

'browserstack.user' - process.env.BROWSERSTACK_USERNAME

'browserstack.key' - process.env.BROWSERSTACK_ACCESS_KEY

'browserstack.local' - process.env.BROWSERSTACK_LOCAL

'browserstack.localIdentifier' - process.env.BROWSERSTACK_LOCAL_IDENTIFIER

'build' - process.env.BROWSERSTACK_BUILD

## Reporting component
Allure reporting is integrated. For configuration please visit https://github.com/allure-framework/allure-jasmine

on local machine it can be generated via command line

```
npm install -g allure-commandline --save-dev
```

allure serve <path of artifacts>, example

```
allure serve auto-generated/allure-results
```


## Running parallel tests execution

Following keys are defined in [default-config-setup.js] (https://github.com/hoangnguyen-git/e2e/blob/main/core/config-setup/default-config-setup.js)

multiCapabilities.maxInstances: 5  Default max instances for selenium grid

bsMultiCapabilities.maxInstances: 5 Default max instances for browser stack


3 Ways to pass the max instances

1. Using environment variable MAX_INSTANCES

2. Using command line param --params.maxInstances

3. Default is 5