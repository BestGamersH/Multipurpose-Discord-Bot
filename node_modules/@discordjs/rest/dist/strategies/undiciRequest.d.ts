import { request, RequestInit } from 'undici';
import { R as ResponseLike } from '../types-65527f29.js';
import 'node:stream';
import 'node:stream/web';
import '@discordjs/collection';

type RequestOptions = Exclude<Parameters<typeof request>[1], undefined>;
declare function makeRequest(url: string, init: RequestInit): Promise<ResponseLike>;
declare function resolveBody(body: RequestInit['body']): Promise<Exclude<RequestOptions['body'], undefined>>;

export { RequestOptions, makeRequest, resolveBody };
