export default class EntityException extends Error {
	constructor(message: string) {
		super(message);

		this.message = message;
		Object.setPrototypeOf(this, EntityException.prototype);
	}
}
