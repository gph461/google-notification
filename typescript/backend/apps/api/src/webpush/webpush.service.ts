import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { SendWebPushDto } from './webpush.dto';

@Injectable()
export class WebPushService {
  async sendNotification(dto: SendWebPushDto) {
    const { token, title, body, icon } = dto;

    try {
      const response = await admin.messaging().send({
        token,
        webpush: {
          notification: {
            title,
            body,
            icon,
          },
        },
      });

      console.log(response);
    } catch (error) {
      throw error;
    }
  }
}
