/**
 * Simulate async behavior for mock API calls.
 * Returns after a randomized delay between min and max ms.
 */
export function delay(min = 200, max = 400): Promise<void> {
  const ms = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise((resolve) => setTimeout(resolve, ms));
}
