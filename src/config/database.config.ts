import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { DataSourceOptions } from "typeorm/browser";

export const getPostgresConfig = (configService: ConfigService): DataSourceOptions => ({
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: 5432,
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    synchronize: false,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    migrations: [`${__dirname}/../database/migrations/*.{ts,js}`],
    logging: false,
    ssl: {
        rejectUnauthorized: false,
    },
})

export async function initializePostgresConnection(configService: ConfigService) {
  const postgresConfig = getPostgresConfig(configService);
  const dataSource = new DataSource(postgresConfig);

  try {
    await dataSource.initialize();
    Logger.log('PostgreSQL connected successfully');
  } catch (error) {
    Logger.error('PostgreSQL connection error:', error);
  }
}