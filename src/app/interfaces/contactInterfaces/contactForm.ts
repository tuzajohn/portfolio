import { MessageResponse } from "../general/messageResponse";

export class ContactForm {
    public name?: String;
    public email?: String;
    public subject?: String;
    public message?: String;

    get isValide(): MessageResponse {
        let errors: String[] = [];
        let errorMessage = '';

        if (this.name === undefined || this.name === '') {
            errors.push('name is required')
        }

        if (this.email === undefined || this.email === '') {
            errors.push('email is required')
        }

        if (this.subject === undefined || this.subject === '') {
            errors.push('subject is required')
        }

        if (this.message === undefined || this.message === '') {
            errors.push('message is required')
        }

        if (errors.length > 0) {
            errorMessage = errors.join(', ');
            return {
                message: errorMessage
            }
        }

        return {
            message: '',
            isSuccess: true
        }
    }
}