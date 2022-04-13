import { test, expect } from '@playwright/test';
import { CartPO } from '../pages/login/cart.po';
import { InventoryPO } from '../pages/login/inventory.po';
import { LoginPO } from '../pages/login/login.po';

test('test', async ({ page }) => {
	const loginPO = new LoginPO(page);
	const inventoryPO = new InventoryPO(page);
	const cartPO = new CartPO(page);
	await loginPO.login('standard_user', 'secret_sauce');

	
	await inventoryPO.addToCart('Sauce Labs Backpack');

	await expect(await inventoryPO.getCartItemsCounter()).toBe(1);

	await inventoryPO.goToCart();

	await expect(await cartPO.getCartItemsCount()).toBe(1);
	await expect(await cartPO.getCartItemQty('Sauce Labs Backpack')).toBe(1);
});
