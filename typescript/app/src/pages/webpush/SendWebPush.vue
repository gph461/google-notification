<script setup lang="ts">
import { Form } from 'ant-design-vue';
import { Api } from 'src/api';
import { PrimaryButton, TextInput } from 'src/components';
import { useLoading } from 'src/composable';
import { ref } from 'vue';
import { SendWebPushDto } from '~backend/webpush/webpush.dto';

const { loading, toast } = useLoading();

const formValue = ref<SendWebPushDto>({
  token: '',
  title: '',
  body: '',
  icon: '',
});

function handleFinish() {
  toast(
    async () => {
      await Api.WebPush.SendWebpush(formValue.value);
    },
    {
      isLoading: loading,
      message: 'Sending Web Push...',
      successMessage: 'Succesfully Send',
    }
  );
}
</script>
<template>
  <Form
    style="height: 100%; width: 100%"
    :model="formValue"
    @finish="handleFinish"
  >
    <div style="height: 95%">
      <TextInput
        v-model="formValue.token"
        type="text"
        label="Token"
        name="token"
        required
      />

      <TextInput
        v-model="formValue.title"
        type="text"
        label="Title"
        name="title"
        :required="false"
      />

      <TextInput
        v-model="formValue.body"
        type="text"
        label="Body"
        name="body"
        :required="false"
      />

      <TextInput
        v-model="formValue.icon"
        type="text"
        label="Icon"
        name="icon"
        :required="false"
      />
    </div>

    <div style="text-align: right">
      <PrimaryButton title="Submit" type="submit" label="Send" />
    </div>
  </Form>
</template>
