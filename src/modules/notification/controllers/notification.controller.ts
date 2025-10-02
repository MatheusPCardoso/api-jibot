import { Controller } from '@nestjs/common'

import { NotificationService } from '../services/notification.service'
import { Public } from '@src/constants'

@Public()
@Controller('notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}
}
