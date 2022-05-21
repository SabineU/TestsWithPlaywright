import { CheckoutStepTwoPage } from "./checkoutStepTwo.page";


export class CheckoutStepOnePage{
    firstNameLocator = '#first-name';
    lastNameLocator = '#last-name';
    zipCodeLocator = '#postal-code';
    continueLocator = '#continue';

    async enterPersonalInformation(page, firstName:string, lastName:string, zipCode:string){
        await page.fill(this.firstNameLocator, firstName);
        await page.fill(this.lastNameLocator, lastName);
        await page.fill(this.zipCodeLocator, zipCode);
        await page.locator(this.continueLocator).click();
        return new CheckoutStepTwoPage();
    }
}
