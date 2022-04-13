import { test, expect } from '@playwright/test';
import { CartPO } from '../pages/login/cart.po';
import { InventoryPO } from '../pages/login/inventory.po';
import { LoginPO } from '../pages/login/login.po';

let loginPO: LoginPO;
let cartPO: CartPO;
let inventoryPO: InventoryPO;

test.beforeEach(async ({ page }) => {
	loginPO = new LoginPO(page);
	inventoryPO = new InventoryPO(page);
	cartPO = new CartPO(page);
});

test.describe('User can add Items to the cart', () => {

	test.beforeEach(async ({}) => {
		// Handle Login as part of test setup as this is not the functionality we are testing in this item.
		// TODO: Obfuscate password, maybe with the use of Environment Variables.
		await loginPO.login('standard_user', 'secret_sauce');
	});

	test('User can add a single item to the cart', async () => {
		const itemToTest = 'Sauce Labs Backpack';
		
		// Add the item into the Cart
		await inventoryPO.addToCart(itemToTest);

		// Validate item's button text has correctly updated
		await inventoryPO.isItemAddedToCart(itemToTest);

		// Validate Item count on Cart button gets updated 
		await expect(await inventoryPO.getCartItemsCounter()).toBe(1);
	
		// Go into the cart page
		await inventoryPO.goToCart();
	
		// Validate number of items in the cart
		await expect(await cartPO.getCartItemsCount()).toBe(1);

		// Validate qty value of our item in the cart
		await expect(await cartPO.getCartItemQty(itemToTest)).toBe(1);
	});
});
