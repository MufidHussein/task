import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { RestaurantModule } from './restaurant/restaurant.module';
import { MenuitemService } from './menuitem/menuitem.service';
import { MenuitemController } from './menuitem/menuitem.controller';
import { MenuitemModule } from './menuitem/menuitem.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RestaurantModule,
    MenuitemModule,
  ],
  providers: [MenuitemService],
  controllers: [MenuitemController],
})
export class AppModule {}
