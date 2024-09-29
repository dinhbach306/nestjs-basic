import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FirestoreModule } from 'src/firestore/firestore.module';
import { config } from 'src/config/config';
import { CompaniesModule } from './companies/companies.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
      envFilePath: ['.env'],
    }),
    FirestoreModule.forRoot({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        projectId: configService.get<string>('FIRESTORE_PROJECT_ID'),
        keyFilename: configService.get<string>('FIRESTORE_KEY_FILENAME'),
      }),
      inject: [ConfigService],
    }),
    CompaniesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
