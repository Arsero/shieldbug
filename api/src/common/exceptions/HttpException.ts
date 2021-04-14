export default class HttpException extends Error {
	statusCode?: number;
	status: string;
	message: string;

	constructor(
		statusCode: number = 500,
		message: string = 'Internal Server Error',
		status: string = 'error'
	) {
		super(message);

		this.statusCode = statusCode;
		this.message = message;
		this.status = status;

		Object.setPrototypeOf(this, HttpException.prototype);
	}
}
