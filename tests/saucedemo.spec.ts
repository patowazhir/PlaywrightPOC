import { test, expect } from '@playwright/test';
import { CartPO } from '../pages/cart.po';
import { InventoryPO } from '../pages/inventory.po';
import { LoginPO } from '../pages/login.po';

let loginPO: LoginPO;
let cartPO: CartPO;
let inventoryPO: InventoryPO;

test.beforeEach(async ({ page }) => {
	loginPO = new LoginPO(page);
	inventoryPO = new InventoryPO(page);
	cartPO = new CartPO(page);
});

test.describe('User can add Items to the cart', () => {

	// TODO: Add custom messages to the assertions https://playwright.dev/docs/test-assertions#custom-expect-message

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

	test('User can add multiple items to the cart', async () => {
		const itemsToTest = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Onesie'];

		// Note, Loops in tests are arguably bad practice as they can be a pain to debug, but this shows how powerful they can be.
		for (const item of itemsToTest) {
			await test.step(`Add item "${item}" to cart`, async () => {
				// Add the item into the Cart
				await inventoryPO.addToCart(item);

				// Validate item's button text has correctly updated
				await inventoryPO.isItemAddedToCart(item);
			});
		}

		// Validate Item count on Cart button gets updated 
		await expect(await inventoryPO.getCartItemsCounter()).toBe(itemsToTest.length);
	
		// Go into the cart page
		await inventoryPO.goToCart();
	
		// Validate total number of items in the cart
		await expect(await cartPO.getCartItemsCount()).toBe(itemsToTest.length);

		// Validate qty value of our items in the cart
		for (const item of itemsToTest) {
			await test.step(`Validate qty of item "${item}" in cart`, async () => {
				await expect(await cartPO.getCartItemQty(item)).toBe(1);
			});
		}
	});
});
