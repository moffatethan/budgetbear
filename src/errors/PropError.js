/**
 * Errors when required properties are not available to a React Component.
 */
export default class PropError extends Error {
  constructor(message) {
    super(message);
    this.name = "PropError";
  }
}
