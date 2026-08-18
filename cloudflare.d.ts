interface D1Result<T = unknown> { results: T[] }
interface D1PreparedStatement { bind(...values: unknown[]): D1PreparedStatement; run(): Promise<unknown>; first<T = unknown>(): Promise<T | null>; all<T = unknown>(): Promise<D1Result<T>>; }
interface D1Database { prepare(query: string): D1PreparedStatement; batch<T = unknown>(statements: D1PreparedStatement[]): Promise<T[]>; }
interface R2ObjectBody { body: ReadableStream; httpEtag: string; writeHttpMetadata(headers: Headers): void; }
interface R2Bucket { put(key: string, value: ArrayBuffer, options?: { httpMetadata?: { contentType?: string } }): Promise<unknown>; get(key: string): Promise<R2ObjectBody | null>; }
interface Fetcher { fetch(request: Request): Promise<Response>; }
declare module "cloudflare:workers" { export const env: { DB: D1Database; MEDIA: R2Bucket }; }
