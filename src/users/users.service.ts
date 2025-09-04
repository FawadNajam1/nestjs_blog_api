import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { QueuesService } from 'src/queues/queues.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,

    private readonly queuesService: QueuesService
  ) {}

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  async createUser(email: string, password: string) {
    const user = this.repo.create({ email, password });
    const savedUser = this.repo.save(user);

    await this.queuesService.addWelcomeEmailJob(email);
    
    return savedUser;
  }
}