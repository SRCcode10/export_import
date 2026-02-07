import { All, Controller, Req, Res } from '@nestjs/common';
import type { Request, Response } from 'express';
import { TrpcService } from './trpc.service';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

@Controller('trpc')
export class TrpcController {
  constructor(private readonly trpcService: TrpcService) {}

  @All('*')
  async trpcHandler(@Req() req: Request, @Res() res: Response) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    
    const response = await fetchRequestHandler({
      endpoint: '/trpc',
      req: new Request(url.toString(), {
        method: req.method,
        headers: new Headers(
          Object.entries(req.headers).map(([key, value]) => [
            key,
            Array.isArray(value) ? value.join(', ') : value || '',
          ]),
        ),
        body: req.body ? JSON.stringify(req.body) : undefined,
      }),
      router: this.trpcService.trpc,
      createContext: () => ({}),
    });

    res.status(response.status);
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });
    
    const body = await response.text();
    res.send(body);
  }
}
