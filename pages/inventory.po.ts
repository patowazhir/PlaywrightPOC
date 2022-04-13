import { Locator, Page } from '@playwright/test';

export class InventoryPO {
	// Base Page
	readonly page: Page;

	// Page specific locators, variable names should indicate what type of element we are using.
	readonly goToCartBtn: Locator;

	constructor(page: Page) {
		this.page = page;
		
		this.goToCartBtn = this.page.locator('.shopping_cart_link');
	}

	/**
	 * Retrieves the Item container.
	 * This is useful when we want to locate different parts of the Item Container such as Description, Price, or the Add to Cart button.
	 * Private as to not confuse any consumers of this PO, yet this can be exposed without any issues.
	 * @param itemName the name of the desired item
	 * @returns a locator that points to the Item Container, which we can use to locate other elements within that item.
	 */
	private async getItemContainer(itemName: string) {

		// xPath is not the greatest or fastest solution, but in this case, where we want to pinpoint a container with certain criteria (such as the item's title), this comes very handy.
		// TODO: Investigate if we can use CSS for this approach.
		return this.page.locator(
			`//div[@class="inventory_item" and .//div[@class="inventory_item_name" and text()="${itemName}"]]`
		);
	}

	/**
	 * Locates an Item on the inventory page, and clicks the Add to Cart button.
	 * @param itemName the name of the desired item
	 */
	async addToCart(itemName: string) {
		const itemContainer = await this.getItemContainer(itemName);
		// TODO: Talk with the dev team to have a specific attribute for these types of buttons, in case we eventually add other buttons in the item's container.
		await itemContainer.locator('button').click();
	}

	/**
	 * Clicks on the Cart button
	 */
	async goToCart() {
		await this.goToCartBtn.click();
	}

	/**
	 * Obtains the current Item count on the Cart indicator as a number.
	 * If the count can't be retrieved, an error will be thrown.
	 * @returns the current item counter of the Cart button.
	 */
	async getCartItemsCounter(): Promise<number> {
		const textContent = await this.goToCartBtn.locator('.shopping_cart_badge').textContent();

		// TODO: Handle scenario where the Cart Button has no counter (empty cart)

		if (textContent) {
			return parseInt(textContent);
		} else {
			throw Error('Couldn\'t obtain the number of items in the cart!');
		}
	}

	/**
	 * Checks the text of the Add to Cart button for the desired item to verify if the item was added or not into the cart.
	 * @param itemName name of the desired item
	 * @returns a boolean expressing if the item is already added to the cart or not.
	 * @example
	 * If it returns true, item is added to the cart (button's text == REMOVE), else, it is still displaying the "Add to Cart" text.
	 */
	async isItemAddedToCart(itemName: string): Promise<boolean> {
		const itemContainer = await this.getItemContainer(itemName);
		const addToCartBtnText = await itemContainer.locator('button').textContent();

		switch (addToCartBtnText) {
		case 'Add to cart':
			return false;
		case 'Remove':
			return true;
		default:
			throw Error(`Couldn't obtain the text for the add to cart button for item "${itemName}"`);
		}

	}
}
