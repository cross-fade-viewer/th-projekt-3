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
  margin: 2em;
  cursor: pointer;
  width: 10em;
  display: flex;
  flex-direction: column;
  text-align:center;

  .image {
    height: 10em;
    overflow: hidden;
    img {
      -o-object-fit: cover;
      object-fit: cover;
      height: 10em;
      width: 10em;
    }
  }

  .info {
    margin: 0;
    background-color: #444444;
    padding: .8rem;
    color: #fff;
    border-top: 1px solid #fff;
    background-color: #444;
  }
}
</style>
