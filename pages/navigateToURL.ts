import { LoginPage } from "./login.page";

export class NavigateToURL{
    async goToURL(page){
        await page.goto('https://www.saucedemo.com/');
        return new LoginPage();
    }
}
