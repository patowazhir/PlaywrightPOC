import { Page } from '@playwright/test';

export class CartPO {
	// Base Page
	readonly page: Page;

	// Page specific locators, variable names should indicate what type of element we are using.

	constructor(page: Page) {
		this.page = page;
	}

	/**
	 * Retrieves the Cart Item container.
	 * This is useful when we want to locate different parts of the Item Container such as Description, Price, or the Add to Cart button.
	 * Private as to not confuse any consumers of this PO, yet this can be exposed without any issues.
	 * @param itemName the name of the desired cart item
	 * @returns a locator that points to the Cart Item Container, which we can use to locate other elements within that item.
	 */
	private async getCartItemContainer(itemName: string) {

		// xPath is not the greatest or fastest solution, but in this case, where we want to pinpoint a container with certain criteria (such as the item's title), this comes very handy.
		// TODO: Investigate if we can use CSS for this approach.
		// TODO: See if we can generate a common locator for this item that can be used in both Inventory Items and Cart Items. May not be worth it, but we can check.
		return this.page.locator(
			`//div[@class="cart_item" and .//div[@class="inventory_item_name" and text()="${itemName}"]]`
		);
	}


	/**
	 * Returns the value of the Quantity field for a given cart item.
	 * @param itemName the name of the desired cart item
	 * @returns the quantity displayed as a number
	 */
	async getCartItemQty(itemName: string): Promise<number> {
		const cartItem = await this.getCartItemContainer(itemName);
		const cartItemQty = await cartItem.locator('.cart_quantity').textContent();

		if (cartItemQty) {
			return parseInt(cartItemQty);
		} else {
			// Errors in this case may not be necessary, but textContent() can return a null, and we need to handle that.
			throw Error(`Couldn't obtain the quantity of item "${itemName}" in the cart!`);
		}
	}

	/**
	 * Returns the number of items on the cart.
	 * @returns number of items on the cart.
	 */
	async getCartItemsCount(): Promise<number> {
		// Was not sure how to do this on Playwright, trying out this solution https://stackoverflow.com/a/61454208
		const cartItems = await this.page.$$('.cart_item');

		if (cartItems) {
			return cartItems.length;
		} else {
			throw Error('Couldn\'t retrieve number of cart items!');
		}
	}
}
