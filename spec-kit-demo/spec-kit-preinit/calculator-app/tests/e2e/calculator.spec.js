/**
 * End-to-end tests for calculator application
 */

import { test, expect } from '@playwright/test';

test.describe('Calculator E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the calculator to be ready
    await page.waitForSelector('.calculator-display');
  });

  test('should display initial state', async ({ page }) => {
    const display = page.locator('.display-result');
    await expect(display).toHaveText('0');
  });

  test('should perform basic addition', async ({ page }) => {
    // Click: 5 + 3 =
    await page.click('[data-digit="5"]');
    await page.click('[data-action="add"]');
    await page.click('[data-digit="3"]');
    await page.click('[data-action="equals"]');

    const display = page.locator('.display-result');
    await expect(display).toHaveText('8');
  });

  test('should perform calculation with keyboard', async ({ page }) => {
    // Type: 10 - 4 =
    await page.keyboard.type('10-4');
    await page.keyboard.press('Enter');

    const display = page.locator('.display-result');
    await expect(display).toHaveText('6');
  });

  test('should handle decimal numbers', async ({ page }) => {
    await page.click('[data-digit="5"]');
    await page.click('[data-action="decimal"]');
    await page.click('[data-digit="2"]');
    await page.click('[data-action="multiply"]');
    await page.click('[data-digit="2"]');
    await page.click('[data-action="equals"]');

    const display = page.locator('.display-result');
    await expect(display).toHaveText('10.4');
  });

  test('should handle operator precedence', async ({ page }) => {
    // 2 + 3 × 4 = 14
    await page.keyboard.type('2+3*4');
    await page.keyboard.press('Enter');

    const display = page.locator('.display-result');
    await expect(display).toHaveText('14');
  });

  test('should clear current entry', async ({ page }) => {
    await page.click('[data-digit="5"]');
    await page.click('[data-action="clear"]');

    const display = page.locator('.display-result');
    await expect(display).toHaveText('0');
  });

  test('should clear all with AC button', async ({ page }) => {
    await page.click('[data-digit="5"]');
    await page.click('[data-action="add"]');
    await page.click('[data-digit="3"]');
    await page.click('[data-action="all-clear"]');

    const display = page.locator('.display-result');
    const expression = page.locator('.display-expression');
    await expect(display).toHaveText('0');
    await expect(expression).toBeEmpty();
  });

  test('should handle backspace', async ({ page }) => {
    await page.keyboard.type('123');
    await page.keyboard.press('Backspace');

    const display = page.locator('.display-result');
    await expect(display).toHaveText('12');
  });

  test('should display division by zero error', async ({ page }) => {
    await page.keyboard.type('5/0');
    await page.keyboard.press('Enter');

    const display = page.locator('.display-result');
    await expect(display).toHaveText('Cannot divide by zero');
  });

  test('should use memory functions', async ({ page }) => {
    // Add 5 to memory
    await page.click('[data-digit="5"]');
    await page.click('[data-action="memory-add"]');

    // Clear display
    await page.click('[data-action="clear"]');

    // Recall memory
    await page.click('[data-action="memory-recall"]');

    const display = page.locator('.display-result');
    await expect(display).toHaveText('5');

    // Memory indicator should be visible
    const memoryButton = page.locator('[data-action="memory-recall"]');
    await expect(memoryButton).toHaveClass(/has-memory/);
  });

  test('should open and close history panel', async ({ page }) => {
    const toggleButton = page.locator('.btn-toggle-history');
    const historyPanel = page.locator('.history-panel');

    // Panel should be closed initially
    await expect(historyPanel).not.toHaveClass(/open/);

    // Open panel
    await toggleButton.click();
    await expect(historyPanel).toHaveClass(/open/);

    // Close panel
    await page.click('.btn-close');
    await expect(historyPanel).not.toHaveClass(/open/);
  });

  test('should add calculation to history', async ({ page }) => {
    // Perform a calculation
    await page.keyboard.type('5+3');
    await page.keyboard.press('Enter');

    // Open history panel
    await page.click('.btn-toggle-history');

    // Check history entry exists
    const historyEntry = page.locator('.history-entry').first();
    await expect(historyEntry).toBeVisible();
    await expect(historyEntry.locator('.history-result')).toHaveText('8');
  });

  test('should be keyboard accessible', async ({ page }) => {
    // Tab through buttons
    await page.keyboard.press('Tab');
    const activeElement = page.locator(':focus');
    await expect(activeElement).toBeVisible();

    // Should have visible focus indicator
    const outlineWidth = await activeElement.evaluate(
      (el) => window.getComputedStyle(el).outlineWidth
    );
    expect(parseInt(outlineWidth)).toBeGreaterThan(0);
  });

  test('should work on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // All buttons should be visible and clickable
    await page.click('[data-digit="5"]');
    await page.click('[data-action="add"]');
    await page.click('[data-digit="3"]');
    await page.click('[data-action="equals"]');

    const display = page.locator('.display-result');
    await expect(display).toHaveText('8');
  });

  test('should meet minimum touch target size', async ({ page }) => {
    const button = page.locator('[data-digit="5"]');
    const box = await button.boundingBox();

    // WCAG 2.1 AA requires minimum 44×44px touch targets
    expect(box.width).toBeGreaterThanOrEqual(44);
    expect(box.height).toBeGreaterThanOrEqual(44);
  });
});
