import { Page, Locator } from '@playwright/test';

export class LoginPO {
	// Base Page
	readonly page: Page;

	// Page specific locators, variable names should indicate what type of element we are using.
	readonly usernameTxtBox: Locator;
	readonly passwordTxtBox: Locator;
	readonly loginBtn: Locator;

	constructor(page: Page) {
		this.page = page;

		this.usernameTxtBox = this.page.locator('[data-test="username"]');
		this.passwordTxtBox = this.page.locator('[data-test="password"]');
		this.loginBtn = this.page.locator('[data-test="login-button"]');
	}

	// Made these methods private as to not convolute the Page Object class, but if specific tests are needed for the login functionality, they can be exposed without risk.

	private async goTo() {
		// Go to https://www.saucedemo.com/
		await this.page.goto('/');
	}

	private async fillUsername(username: string) {
		await this.usernameTxtBox.fill(username);
	}

	private async fillPassword(password: string) {
		await this.passwordTxtBox.fill(password);
	}

	private async clickLoginBtn() {
		await this.loginBtn.click();
	}

	/**
   * Opens the base page and attempts to go through the login process.
   * After this method's completion, the test should be on the Inventory page.
   * @param username
   * @param password
   */
	async login(username: string, password: string) {
		await this.goTo();
		await this.fillUsername(username);
		await this.fillPassword(password);
		await this.loginBtn.click();
	}
}
