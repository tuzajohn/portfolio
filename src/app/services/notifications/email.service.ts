import { Injectable } from '@angular/core';
import { EmailRequest } from '../../interfaces/notifications/email-request';


const CONFIG = {
  host: "smtp.gmail",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "johntuza94@gmail.com",
    pass: "incs jwai lazt ztbd",
  },
};

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() {

  }
  sendEmail(request: EmailRequest): String | undefined {
    let id = '';

    return id;
  }
  /*async sendEmail(request: EmailRequest): Promise<string | undefined> {
    let info = await this.transporter.sendMail({
      from: request.from,
      to: request.to?.join(', '),
      subject: request.subject,
      text: request.text,
      html: request.html
    });

    let id = info.messageId as unknown as string;

    return id;
  }*/
}
