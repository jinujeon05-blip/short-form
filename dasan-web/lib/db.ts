import { promises as fs } from "fs";
import path from "path";
import { Redis } from "@upstash/redis";
import type { Applicant, Inquiry, Job, Partner } from "./types";

// Records live in three hashes (id → record). On Vercel this is Upstash Redis
// (added from the Vercel Marketplace, which sets the KV_REST_API_* env vars);
// without those vars it falls back to a JSON file for local development.

type Collection = "jobs" | "applicants" | "partners" | "inquiries";
type RecordOf<C extends Collection> = C extends "jobs"
  ? Job
  : C extends "applicants"
    ? Applicant
    : C extends "inquiries"
      ? Inquiry
      : Partner;

const redisUrl = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
const redis = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;

export const storageConfigured = redis !== null;

const KEY_PREFIX = "dasan:";
const FILE = path.join(process.cwd(), ".data", "db.json");

type FileDb = Record<Collection, Record<string, unknown>>;

async function readFileDb(): Promise<FileDb> {
  try {
    return { jobs: {}, applicants: {}, partners: {}, inquiries: {}, ...JSON.parse(await fs.readFile(FILE, "utf8")) } as FileDb;
  } catch {
    return { jobs: {}, applicants: {}, partners: {}, inquiries: {} };
  }
}

async function writeFileDb(db: FileDb) {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(db, null, 2));
}

export async function list<C extends Collection>(collection: C): Promise<RecordOf<C>[]> {
  let rows: RecordOf<C>[];
  if (redis) {
    const all = await redis.hgetall<Record<string, RecordOf<C>>>(KEY_PREFIX + collection);
    rows = all ? Object.values(all) : [];
  } else {
    rows = Object.values((await readFileDb())[collection]) as RecordOf<C>[];
  }
  return rows.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function get<C extends Collection>(collection: C, id: string): Promise<RecordOf<C> | null> {
  if (redis) return (await redis.hget<RecordOf<C>>(KEY_PREFIX + collection, id)) ?? null;
  return ((await readFileDb())[collection][id] as RecordOf<C> | undefined) ?? null;
}

export async function put<C extends Collection>(collection: C, record: RecordOf<C>): Promise<void> {
  if (redis) {
    await redis.hset(KEY_PREFIX + collection, { [record.id]: record });
    return;
  }
  const db = await readFileDb();
  const rows: Record<string, unknown> = db[collection];
  rows[record.id] = record;
  await writeFileDb(db);
}

export async function remove(collection: Collection, id: string): Promise<void> {
  if (redis) {
    await redis.hdel(KEY_PREFIX + collection, id);
    return;
  }
  const db = await readFileDb();
  delete db[collection][id];
  await writeFileDb(db);
}

export function newId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

// Short code a partner shares with the workers they bring, e.g. "DS4K7Q".
export function newPartnerCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "DS";
  for (let i = 0; i < 4; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}
