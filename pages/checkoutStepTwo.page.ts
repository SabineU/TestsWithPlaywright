import { CheckoutComletePage } from "./checkoutComplete.page";

export class CheckoutStepTwoPage{
    finishLocator = '//button[@data-test="finish"]'
    itemSubTotalLocator = '//div[@class="summary_subtotal_label"]'
    itemTotalLocator = '//div[@class="summary_total_label"]'

    
    async clickFinishButton(page){
        await page.locator(this.finishLocator).click();
        return new CheckoutComletePage();
    }
}
