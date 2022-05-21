import { test, expect, Page } from '@playwright/test';
import requiredData from "../data/requiredData.json";
import {NavigateToURL} from '../pages/navigateToURL';
import {LoginPage} from '../pages/login.page';
import {InventoryPage} from '../pages/inventory.page';
import {InventoryItemPage} from '../pages/inventoryItem.page';
import {CartPage} from '../pages/cart.page';
import {CheckoutStepOnePage} from '../pages/checkoutStepOne.page';
import {CheckoutStepTwoPage} from '../pages/checkoutStepTwo.page';
import {CheckoutComletePage} from '../pages/checkoutComplete.page';

//Class Instantiation
const navigateToURL = new NavigateToURL();
const loginPage = new LoginPage();
const inventoryPage = new InventoryPage();
const inventoryItemPage = new InventoryItemPage();
const cartPage = new CartPage();
const checkoutStepOnePage = new CheckoutStepOnePage();
const checkoutStepTwoPage = new CheckoutStepTwoPage();
const checkoutComletePage = new CheckoutComletePage();

test.beforeEach(async ({ page}) => {
    await navigateToURL.goToURL(page);
    await expect(page).toHaveTitle(requiredData.homePageTabTitle);
    await expect(page).toHaveURL(requiredData.homePageURL);
});

test.describe('Validation 1', () => {
    test('should allow to purchase item', async ({ page}) => {
      // Step1. Log in as a `standard user` is in the beforeEach block
      await loginPage.login(page, requiredData.username_standardUser, requiredData.password);

      // Step2. Find an item by name, then add it to the cart
      await inventoryPage.findItemByName(page, requiredData.item1_Name);
      await inventoryItemPage.clickAddItemToCart(page, inventoryItemPage.addToCartBackpackLocator);
      await inventoryItemPage.clickbackToProducts(page);

      // Step3. Find a second item by name, and add it to the cart as well
      await inventoryPage.findItemByName(page, requiredData.item2_Name);
      await inventoryItemPage.clickAddItemToCart(page, inventoryItemPage.addToCartOnesieLocator);
      await inventoryItemPage.clickbackToProducts(page);

      // Step4. Go to the cart
      await inventoryPage.clickCart(page);

      // Step5. Find an item by name, then remove it from the cart
      await inventoryPage.findItemByName(page, requiredData.item1_Name);
      await cartPage.removeItemByName(page);
      await expect(page.locator(inventoryItemPage.addToCartBackpackLocator)).toHaveText(requiredData.addToCartButtonText);
      
      // Step6.a. Validate in the Checkout Overview that: It only contains the items that you want to purchase
      await inventoryPage.clickCart(page);
      await expect(page.locator(cartPage.onesieLocator)).toHaveText(requiredData.item2_Name);

      // Step6.b. Validate in the Checkout Overview that: The Item Total is right
      await cartPage.clickCheckout(page);
      checkoutStepOnePage.enterPersonalInformation(
          page, 
          requiredData.firstName, 
          requiredData.lastName, 
          requiredData.zipCode
        );
        await expect(page.locator(checkoutStepTwoPage.itemSubTotalLocator)).toHaveText(requiredData.itemSubTotal);
        await expect(page.locator(checkoutStepTwoPage.itemTotalLocator)).toHaveText(requiredData.itemTotal);
    
      // Step7. Finish the purchase
      await checkoutStepTwoPage.clickFinishButton(page);

      // Step7. Validate that the website confirms the order
      await expect(page.locator(checkoutComletePage.checkoutCompleteTitleLocator)).toHaveText(requiredData.checkoutCompleteTitle);
      await expect(page.locator(checkoutComletePage.successMessageLocator)).toHaveText(requiredData.successOrderingMessage);
    });
  });

  test.describe('Validation 2', () => {
    test('should allow to sort items by Name A-Z', async ({ page}) => {
        // Step1. Log in as a `standard user`
        await loginPage.login(page, requiredData.username_standardUser, requiredData.password);

        // Step2. Sort products by name
        await inventoryPage.filterItemsByName(page, requiredData.filterByNameAZ);

        // step3. Validate that the sorting is right
        await expect(await inventoryPage.sortByNameAZ(page)).toBeTruthy();
    }); 
    test('should allow to sort items by Name Z-A', async ({ page}) => {
        // Step1. Log in as a `standard user`
        await loginPage.login(page, requiredData.username_standardUser, requiredData.password);
        
        // Step2. Sort products by name
        await inventoryPage.filterItemsByName(page, requiredData.filterByNameZA);
        
        // step3. Validate that the sorting is right
        await expect(await inventoryPage.sortByNameZA(page)).toBeTruthy();
      }); 
  });

  test.describe('Validation 3', () => {
    test('should allow to sort items by Price Low - High', async ({ page}) => {
        // Step1. Log in as a `standard user`
        await loginPage.login(page, requiredData.username_standardUser, requiredData.password);

        // Step2. Sort products by price low
        await inventoryPage.filterItemsByPrice(page, requiredData.filterByPriceLH);

        // step3. Validate that the sorting is right
        await expect(inventoryPage.sortByPriceLH(page)).toBeTruthy();
        //console.log((await page.locator('div.inventory_item:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1)').innerText()).replace('$',''));
        //console.log(await inventoryPage.sortByPriceLH);
        //console.log((await page.locator('(//div[@class="inventory_item_price"])[1]').innerHTML()).replace('$',''))
    }); 
    test('should allow to sort items by Price High - Low', async ({ page}) => {
        // Step1. Log in as a `standard user`
        await loginPage.login(page, requiredData.username_standardUser, requiredData.password);
        
        // Step2. Sort products by name
        await inventoryPage.filterItemsByName(page, requiredData.filterByNameZA);
        
        // step3. Validate that the sorting is right
        //await expect(await inventoryPage.sortByNameZA(page)).toBeTruthy();
      }); 
  });

  test.describe('Validation 4', () => {
    test('should block locked_out_user', async ({ page}) => {
        // Step1. Log in as a `locked_out_user`
        await loginPage.login(page, requiredData.username_lockedOutUser, requiredData.password);

        // Step2. The validation should fail
        await expect(page.locator(loginPage.errorContainer)).toHaveText(requiredData.failLogin);

        // step3. Add capabilities to your program so it can create reports with screenshots when something fails
        // I would like to handle this task by using Allure Report which provide a detailed report no matter what.
    }); 
  });
