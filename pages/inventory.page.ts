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
    async checkIfSortedByName(page){
        let second_index;
        let array = new Array();
        array.push(await page.locator('#item_4_title_link > div:nth-child(1)').innerText());
        array.push(await page.locator('#item_0_title_link > div:nth-child(1)').innerText());
        array.push(await page.locator('#item_1_title_link > div:nth-child(1)').innerText());
        array.push(await page.locator('#item_5_title_link > div:nth-child(1)').innerText());
        array.push(await page.locator('#item_2_title_link > div:nth-child(1)').innerText());
        array.push(await page.locator('#item_3_title_link > div:nth-child(1)').innerText());
        
        /*let x = true
        for (let i=0; i<array.length; i++){
            if (array[i+1]<array[i]){
                x = false; break;
            }
        }
        return x;*/
        for(let first_index = 0; first_index < array.length; first_index++){
            second_index = first_index + 1;
          if(array[second_index] - array[first_index] < 0) return false;
        }
        return true;
    }
    async checkIfSortedByPrice(page){
        let second_index;
        let arrayItem = new Array();
        arrayItem.push((await page.locator('(//div[@class="inventory_item_price"])[1]').innerHTML()).replace('$',''));
        arrayItem.push((await page.locator('(//div[@class="inventory_item_price"])[2]').innerHTML()).replace('$',''));
        arrayItem.push((await page.locator('(//div[@class="inventory_item_price"])[3]').innerHTML()).replace('$',''));
        arrayItem.push((await page.locator('(//div[@class="inventory_item_price"])[4]').innerHTML()).replace('$',''));
        arrayItem.push((await page.locator('(//div[@class="inventory_item_price"])[5]').innerHTML()).replace('$',''));
        arrayItem.push((await page.locator('(//div[@class="inventory_item_price"])[6]').innerHTML()).replace('$',''));

        for(let first_index = 0; first_index < arrayItem.length; first_index++){
            second_index = first_index + 1;
          if(arrayItem[second_index] - arrayItem[first_index] < 0) return false;
        }
        return true;
    }
}
