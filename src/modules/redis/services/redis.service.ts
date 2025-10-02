import { InjectRedis } from '@liaoliaots/nestjs-redis'
import { Injectable, OnModuleDestroy } from '@nestjs/common'
import { Redis } from 'ioredis'
import { REDIS_DEFAULT_TTL } from '../constants'

@Injectable()
export class RedisService implements OnModuleDestroy {
  constructor(@InjectRedis() private readonly redis: Redis) {
    this.connect()
  }

  async onModuleDestroy() {
    await this.redis.quit()
  }

  private async connect() {
    this.redis.on('error', (error) => {
      console.error('Redis Client Error', error)
    })
    this.redis.on('connect', () => {
      console.log('Redis Client Connected')
    })
  }

  private createHashKey(accountId: number, complement: string) {
    return `jibot:account:${accountId}:${complement}`
  }

  private createKey(key: string) {
    return `jibot:${key}`
  }

  async hset(
    accountId: number,
    complement: string,
    key: string,
    value: string,
    ttl = REDIS_DEFAULT_TTL,
  ): Promise<void> {
    const hashKey = this.createHashKey(accountId, complement)
    await this.redis.hset(hashKey, key, value)
    await this.redis.expire(hashKey, ttl)
  }

  async hget(
    accountId: number,
    complement: string,
    key: string,
  ): Promise<string | null> {
    const hashKey = this.createHashKey(accountId, complement)
    return await this.redis.hget(hashKey, key)
  }

  async hkeys(accountId: number, complement: string): Promise<string[]> {
    const hashKey = this.createHashKey(accountId, complement)
    return await this.redis.hkeys(hashKey)
  }

  async set(
    key: string,
    value: string,
    ttl = REDIS_DEFAULT_TTL,
  ): Promise<void> {
    const customKey = this.createKey(key)
    await this.redis.set(customKey, JSON.stringify(value))
    await this.redis.expire(customKey, ttl)
  }

  async get(key: string): Promise<string | null> {
    const customKey = this.createKey(key)
    return await this.redis.get(customKey)
  }
}
