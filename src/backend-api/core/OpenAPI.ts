/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiRequestOptions } from './ApiRequestOptions';

type Resolver<T> = (options: ApiRequestOptions) => Promise<T>;
type Headers = Record<string, string>;

type Config = {
    BASE: string;
    VERSION: string;
    WITH_CREDENTIALS: boolean;
    TOKEN?: string | Resolver<string>;
    USERNAME?: string | Resolver<string>;
    PASSWORD?: string | Resolver<string>;
    HEADERS?: Headers | Resolver<Headers>;
    ENCODE_PATH?: (path: string) => string;
}

export const OpenAPI: Config = {
    BASE: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
    VERSION: '1.0.0',
    WITH_CREDENTIALS: false,
    TOKEN: undefined,
    USERNAME: undefined,
    PASSWORD: undefined,
    HEADERS: undefined,
    ENCODE_PATH: undefined,
};