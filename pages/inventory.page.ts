import { InventoryItemPage } from "./inventoryItem.page";
import { CartPage } from "./cart.page";

export class InventoryPage{
    cartLocator = '//a[@class="shopping_cart_link"]';
    filterLocator = '//select[@data-test="product_sort_container"]';
    
    async findItemByName(page, itemName:string){
        await page. locator(`text=${itemName}`).click();
        return new InventoryItemPage();
    }
    async clickCart(page){
        await page.locator(this.cartLocator).click();
        return new CartPage();
    }
    async filterItemsByName(page, itemValue:string){
        await page.selectOption(this.filterLocator, itemValue);
    }
    async filterItemsByPrice(page, itemValue:string){
        await page.selectOption(this.filterLocator, itemValue);
    }
    async sortByNameAZ(page){
        let array = new Array();
        array.push(await page.locator('#item_4_title_link > div:nth-child(1)').innerText());
        array.push(await page.locator('#item_0_title_link > div:nth-child(1)').innerText());
        array.push(await page.locator('#item_1_title_link > div:nth-child(1)').innerText());
        array.push(await page.locator('#item_5_title_link > div:nth-child(1)').innerText());
        array.push(await page.locator('#item_2_title_link > div:nth-child(1)').innerText());
        array.push(await page.locator('#item_3_title_link > div:nth-child(1)').innerText());
        
        let x = true
        for (let i=0; i<array.length; i++){
            if (array[i+1]<array[i]){
                x = false; break;
            }
        }
        return x;
    }
    async sortByNameZA(page){
        let array = new Array();

        array.push(await page.locator('#item_3_title_link > div:nth-child(1)').innerText());
        array.push(await page.locator('#item_2_title_link > div:nth-child(1)').innerText());
        array.push(await page.locator('#item_5_title_link > div:nth-child(1)').innerText());
        array.push(await page.locator('#item_1_title_link > div:nth-child(1)').innerText());
        array.push(await page.locator('#item_0_title_link > div:nth-child(1)').innerText());
        
        
        let x = true
        for (let i=0; i<array.length; i++){
            if (array[i]<array[i+1]){
                x = false; break;
            }
        }
        return x;
    }

    async sortByPriceLH(page){
        let array = new Array();
    //  (//div[@class="inventory_item_price"])[1]
        /*array.push((await page.locator('div.inventory_item:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1)').innerText()).replace('$',''));
        array.push((await page.locator('div.inventory_item:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1)').innerText()).replace('$',''));
        array.push((await page.locator('div.inventory_item:nth-child(3) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1)').innerText()).replace('$',''));
        array.push((await page.locator('div.inventory_item:nth-child(4) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1)').innerText()).replace('$',''));
        array.push((await page.locator('div.inventory_item:nth-child(5) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1)').innerText()).replace('$',''));
        array.push((await page.locator('div.inventory_item:nth-child(6) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1)').innerText()).replace('$',''));*/
        
        array.push((await page.locator('(//div[@class="inventory_item_price"])[1]').innerHTML()).replace('$',''));
        array.push((await page.locator('(//div[@class="inventory_item_price"])[2]').innerHTML()).replace('$',''));
        array.push((await page.locator('(//div[@class="inventory_item_price"])[3]').innerHTML()).replace('$',''));
        array.push((await page.locator('(//div[@class="inventory_item_price"])[4]').innerHTML()).replace('$',''));
        array.push((await page.locator('(//div[@class="inventory_item_price"])[5]').innerHTML()).replace('$',''));
        array.push((await page.locator('(//div[@class="inventory_item_price"])[6]').innerHTML()).replace('$',''));

        let x = true
        for (let i=0; i<array.length; i++){
            if (array[i+1]<array[i]){
                x = false; break;
            }
        }
        return x;
    }
    async sortByPriceHL(page){
        let array = new Array();
        
        array.push((await page.locator('div.inventory_item:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div').allInnerTexts()).toString());
        array.push((await page.locator('div.inventory_item:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div').allInnerTexts()).toString());
        
        array.push((await page.locator('div.inventory_item:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div').allInnerTexts()).toString());
        array.push((await page.locator('div.inventory_item:nth-child(3) > div:nth-child(2) > div:nth-child(2) > div').allInnerTexts()).toString());
        array.push((await page.locator('div.inventory_item:nth-child(4) > div:nth-child(2) > div:nth-child(2) > div').allInnerTexts()).toString());
        array.push((await page.locator('div.inventory_item:nth-child(5) > div:nth-child(2) > div:nth-child(2) > div').allInnerTexts()).toString());
        array.push((await page.locator('div.inventory_item:nth-child(6) > div:nth-child(2) > div:nth-child(2) > div').allInnerTexts()).toString());
        
        let x = true
        for (let i=0; i<array.length-1; i++){
            if (array[i+1]<array[i]){
                x = false; break;
            }
        }
        return x; 
        
    }
}
