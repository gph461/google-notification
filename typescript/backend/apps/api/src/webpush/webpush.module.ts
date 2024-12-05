import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { WebPushController } from './webpush.controller';
import { WebPushService } from './webpush.service';

@Module({
  controllers: [WebPushController],
  providers: [WebPushService],
  exports: [WebPushService],
})
export class WebPushModule {
  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  }
}
