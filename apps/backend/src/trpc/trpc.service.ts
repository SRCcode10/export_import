import { Injectable } from '@nestjs/common';
import { appRouter } from '@importexport/api';

@Injectable()
export class TrpcService {
  trpc = appRouter;
}
