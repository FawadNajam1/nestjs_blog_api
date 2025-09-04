import { OnWorkerEvent, Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { MailService } from "src/mail/mail.service";

@Processor('email-queue')
export class EmailProcessor extends WorkerHost {
    constructor(private readonly mailService: MailService) {
        super();
    }

    async process(job: Job) {
        const { to } = job.data;
        // console.log(`Sending welcome email to: ${to}`);
        await this.mailService.sendWelcomeEmail(to);
    }

    @OnWorkerEvent('completed')
    onComplete(job: Job) {
        console.log(`Email job ${job.id} completed`);
    }

    @OnWorkerEvent('failed')
    onFailed(job: Job, err: Error) {
        console.log(`Job ${job.id} failed. Error ${err.message}`);
    }
}