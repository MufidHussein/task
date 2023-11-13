import { Module } from '@nestjs/common';
import { MenuitemController } from './menuitem.controller';
import { MenuitemService } from './menuitem.service';

@Module({
  providers: [MenuitemService],
  controllers: [MenuitemController],
})
export class MenuitemModule {}
