import { InventoryPage } from "./inventory.page";

export class InventoryItemPage{
   addToCartBackpackLocator = '#add-to-cart-sauce-labs-backpack';
   backToProductsLocator = '//div[@class="left_component"]';
   addToCartOnesieLocator = '#add-to-cart-sauce-labs-onesie';
    
    async clickAddItemToCart(page,locator:string){
        await page.locator(locator).click();
        return new InventoryPage();
    }
    async clickbackToProducts(page){
        await page.locator(this.backToProductsLocator).click();
        return new InventoryPage();
    }
}

