import { MessageResponse } from "../general/messageResponse";

export class MessageResponseHelper {
    message: String;
    isSuccess?: boolean | undefined;
    messageResponse: MessageResponse = { isSuccess: false, message: '' }
    constructor(_message: String, _isSuccess?: boolean | undefined) {
        this.message = _message;
        this.isSuccess = _isSuccess == undefined ? false : _isSuccess;
    }

    get(): MessageResponse {
        this.messageResponse.isSuccess = this.isSuccess;
        this.messageResponse.message = this.message;

        return this.messageResponse;
    }
}