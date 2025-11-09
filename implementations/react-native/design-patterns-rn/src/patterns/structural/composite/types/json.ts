export type JsonValue = null | string | number | boolean | JsonValue[] | { [k: string]: JsonValue };
export type Json = null | boolean | number | string | Json[] | { [k: string]: Json };
