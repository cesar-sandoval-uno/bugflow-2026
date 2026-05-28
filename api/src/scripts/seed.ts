import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app/app.module';
import { DataSource } from 'typeorm';
import { User } from '../modules/users/entities/user.entity';
import { UserRole } from '@bugflow-2026/shared-types';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dataSource = app.get(DataSource);

  const userRepo = dataSource.getRepository(User);

  const existingAdmin = await userRepo.findOne({
    where: { email: 'admin@bugflow.com' },
  });

  if (!existingAdmin) {
    await userRepo.save({
      email: 'admin@bugflow.com',
      name: 'Admin',
      role: UserRole.ADMIN,
    });

    console.log('✅ Admin user created');
  } else {
    console.log('ℹ️ Admin already exists');
  }

  await app.close();
}

bootstrap();