/**
 * @description Method to check if an item is an object. Date and Function are considered
 * an object, so if you need to exclude those, please update the method accordingly.
 * @param item - The item that needs to be checked
 * @return {Boolean} Whether or not @item is an object
 */
export function isObject(item: any): boolean {
  return item === Object(item) && !Array.isArray(item);
}

/**
 * @description Method to check if an item is truthy
 * @param {any} t - The item that needs to be checked
 * @return {Boolean} Whether or not @item is truthy
 */
export function isTruthy(t: any): boolean {
  return typeof t !== 'undefined' && t !== '' && t !== null;
}
