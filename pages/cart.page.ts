import { CheckoutStepOnePage } from "./checkoutStepOne.page";

export class CartPage{
    removeBackpackLocator = '#remove-sauce-labs-backpack';
    onesieLocator = '//div[@class="inventory_item_name"]';
    checkoutLocator = '#checkout';
    
    async removeItemByName(page){
        await page.locator(this.removeBackpackLocator).click();
    }
    async clickCheckout(page){
        await page.locator(this.checkoutLocator).click();
        return new CheckoutStepOnePage();
    }  
}

