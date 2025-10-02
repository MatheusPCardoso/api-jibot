import { Controller } from '@nestjs/common'

import { SubscriptionCronService } from '../services/subscription-cron.service'

@Controller('cron/subscription')
export class SubscriptionCronController {
  constructor(private subscriptionCronService: SubscriptionCronService) {}
}
