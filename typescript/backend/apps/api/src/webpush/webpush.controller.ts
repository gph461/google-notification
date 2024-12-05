import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsePublic } from '~backend/guards/jwt-auth.guard';
import { SendWebPushDto } from './webpush.dto';
import { WebPushService } from './webpush.service';

@Controller('webpush')
export class WebPushController {
  constructor(private readonly webpushService: WebPushService) {}

  @Post('send-notification')
  @UsePublic()
  @ApiOperation({ summary: 'Send a push notification to a single device' })
  @ApiResponse({ status: 200, description: 'Notification sent successfully' })
  async sendNotification(@Body() dto: SendWebPushDto) {
    await this.webpushService.sendNotification(dto);
  }
}
