import { test, expect } from '@playwright/test';
import { InventoryPO } from '../pages/login/inventory.po';
import { LoginPO } from '../pages/login/login.po';

test('test', async ({ page }) => {
	const loginPO = new LoginPO(page);
	await loginPO.login('standard_user', 'secret_sauce');

	const inventoryPO = new InventoryPO(page);
	await inventoryPO.addToCart('Sauce Labs Backpack');

	await expect(await inventoryPO.getCartItemsCount()).toBe(1);

	await inventoryPO.goToCart();
});
