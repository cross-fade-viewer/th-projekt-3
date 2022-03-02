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

<style lang="scss" scoped>

.image-preview {
  z-index: 20;
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align:center;
  word-break: break-word;

  .image {
    overflow: hidden;
    img {
      -o-object-fit: cover;
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  .info {
    margin: 0;
    background-color: #444444;
    padding: .8rem;
    color: #fff;
    border-top: 1px solid #fff;
  }
}
</style>
