// import { serve } from 'https://deno.land/std@0.140.0/http/server.ts';
import { serve } from 'https://deno.land/std@0.136.0/http/mod.ts';
import { httpRequestHandler } from './handlers.ts';
// import * as handlers from './handlers.ts';

const env = Deno.env.toObject();

// const PORT = parseInt(Deno.env.get("PORT") ?? "8080");
const PORT = parseInt(env.PORT ?? '8080');

console.log(`Starting HTTP webserver; access it at http://localhost:${PORT}`);

// await serve(handlers.httpRequestHandler, { port: PORT });
await serve(httpRequestHandler, { port: PORT });
