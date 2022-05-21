##                        Welcome to the Web Automation Assessment 

This Web Automation Assessment is about automating a web site (https://www.saucedemo.com/) using Playwright Test Automation tool with TypeScript language and Allure for reporting

## Setup
Once this repository is cloned into a local folder:
1. Open the terminal or command prompt and enter into the cloned folder/repo
2. Run the command `npm install` to install all dependancies 

## How to run
|ID|Description| Command |
| :---: | :--- | :--- |
|1|Run all tests in headless mode|`npm run test` or `npx playwright test`|
|2|Run all tests in headed mode|`npm run testInHeadedMode` or `npx playwright test --headed`|
|3|Run one test in headless mode|`npx playwright test --g "test name"`|
|4|Run one test in headed mode|`npx playwright test --headed --g "test name"`|
|5|Generate allure report|`npm run allureReport` or `allure generate ./allure-results --clean`|
|6|Open report|`npm run openReport` or `allure open ./allure-report`|

  
## Tests coverage
|ID|Description| Command |
| :---: | :--- | :--- |
|1|Validation 1|1. Log in as a `standard user`<br>2. Find an item by name, then add it to the cart<br>3. Find a second item by name, and add it to the cart as well<br>4. Go to the cart<br>5. Find an item by name, then remove it from the cart<br>6.a. Validate in the Checkout Overview that: It only contains the items that you want to purchase<br>6.b. Validate in the Checkout Overview that: The Item Total is right<br>7. Finish the purchase<br> 8. Validate that the website confirms the order
|2|Validation 2|1. Log in as a `standard user`<br>2. Sort products by name<br>3. Validate that the sorting is right
|3|Validation 3|1. Log in as a `standard user`<br>2. Sort products by price<br>3. Validate that the sorting is right|
|4|Validation 4|1. Log in as a `locked_out_user`<br>2. The validation should fail<br>3. Add capabilities to your program so it can create reports with screenshots when something fails

## Note
The purpose of automation is to automate the expected behaviour of an application and regulary run the tests against the application to see if the newly added features did not break the existing features. With this in mind, I dicided to handle the last task of Validation 4 by using Allure Report which provide a detailed report no matter what.