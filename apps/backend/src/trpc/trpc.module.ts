import { Module } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { TrpcController } from './trpc.controller';

@Module({
  providers: [TrpcService],
  controllers: [TrpcController],
})
export class TrpcModule {}
