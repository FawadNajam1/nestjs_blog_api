import { BullModule } from "@nestjs/bullmq";
import { Module } from "@nestjs/common";
import { EmailProcessor } from "./email.processor";
import { QueuesService } from "./queues.service";
import { MailService } from "src/mail/mail.service";


@Module({
    imports: [
        BullModule.forRoot({
            connection: {
                host: 'localhost',
                port: 6379,
            }
        }),
        BullModule.registerQueue({
            name: 'email-queue'
        })
    ],
    providers: [EmailProcessor, QueuesService, MailService],
  exports: [QueuesService],
})

export class QueuesModule {}