import { InventoryPage } from "./inventory.page";

export class LoginPage{
    usernameLocator = '#user-name';
    passwordLocator = '#password';
    loginButton = '#login-button';
    errorContainer = '//div[@class="error-message-container error"]';
    
    async login(page, username:string, password:string){
        await page.fill(this.usernameLocator, username);
        await page.fill(this.passwordLocator, password);
        await page.locator(this.loginButton).click();
        return new InventoryPage();
    }
}
