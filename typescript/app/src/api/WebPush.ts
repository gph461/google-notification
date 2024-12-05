import { SendWebPushDto } from '~backend/webpush/webpush.dto';
import { Api } from '.';

export default {
  async SendWebpush(dto: SendWebPushDto) {
    await Api.client('/webpush').post('/send-notification', dto);
  },
};
