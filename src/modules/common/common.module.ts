import { AccountService } from '@common/services/account.service'
import { CustomerService } from '@common/services/customer.service'
import { PlanService } from '@src/modules/common/services/plan.service'
import { SubscriptionService } from '@common/services/subscription.service'
import { TransactionService } from '@common/services/transaction.service'
import { Global, Module } from '@nestjs/common'
import { RedisModule } from '@redis/redis.module'

import { AccountController } from './controllers/account.controller'
import { CustomerController } from './controllers/customer.controller'
import { PlanController } from './controllers/plan.controller'
import { SubscriptionController } from './controllers/subscription.controller'
import { TransactionController } from './controllers/transaction.controller'
import { UserController } from './controllers/user.controller'
import { UserService } from './services/user.service'
import { PrismaService } from './services/prisma.service'

@Global()
@Module({
  imports: [RedisModule],
  providers: [
    CustomerService,
    SubscriptionService,
    TransactionService,
    AccountService,
    PlanService,
    UserService,
    PlanService,
    PrismaService,
  ],
  exports: [
    CustomerService,
    TransactionService,
    AccountService,
    SubscriptionService,
    PlanService,
    UserService,
    PlanService,
    PrismaService,
  ],
  controllers: [
    AccountController,
    CustomerController,
    PlanController,
    SubscriptionController,
    TransactionController,
    UserController,
  ],
})
export class CommonModule {}
