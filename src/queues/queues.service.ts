import { InjectQueue } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { Queue } from "bullmq";

@Injectable()
export class QueuesService{
    constructor(
        @InjectQueue('email-queue')
        private emailQueue: Queue
    ) {}

    async addWelcomeEmailJob(to: string) {
        await this.emailQueue.add('send-welcome', {to});
    }
}