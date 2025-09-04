import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
    private transporter: any;

    constructor(private readonly configService: ConfigService) {

        this.transporter = nodemailer.createTransport({
            host: configService.get('EMAIL_HOST'),
            port: configService.get<number>('EMAIL_PORT'),
            auth: {
                user: configService.get('EMAIL_USER'),
                pass: configService.get('EMAIL_PASS')
            }
        })
    }

    async sendWelcomeEmail(to: string) {
        // console.log(`Sending welcome email to: ${to}`);
        try {
            const info = await this.transporter.sendMail({
                from: '"Blog API" <fawad.work99@gmail.com>',
                to,
                subject: 'Welcome to My Blog!',
                text: 'Thanks for registering at MyBlog. We are excited to have you!',
            });
            // console.log(`Email sent! Message ID: ${info.messageId}`);
        } catch (error) {
            console.error('Failed to send email:', error);
        }
    }
}