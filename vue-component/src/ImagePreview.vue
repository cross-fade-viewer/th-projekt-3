<template>
  <div class="image-preview" @click="$emit('click')">
    <div class="image">
      <img :src="src">
    </div>
    <dl class="info">
      <dt>{{title}}</dt>
    </dl>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    src: { type: String },
    title: { type: String },
  },
  emits: [
    'click',
  ],
});
</script>
