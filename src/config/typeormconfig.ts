
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { getPostgresConfig } from './database.config';
config();

const configService = new ConfigService();

export const AppDataSource = new DataSource(getPostgresConfig(configService));