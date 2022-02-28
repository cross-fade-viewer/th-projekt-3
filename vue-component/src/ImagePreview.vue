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
  margin: 2em auto;
  cursor: pointer;
  min-width: 20em;
  width: 90%;
  display: flex;
  flex-direction: column;
  background-color: #222;

  img {
    display: block;
    height: 100%;
    width: 100%;
    -o-object-fit: contain;
    object-fit: contain;
  }
  .info {
    margin: 0;
    background-color: #444444;
    flex-grow: 1;
    padding: .8rem;
    color: #fff;
    border-top: 1px solid #fff;
    background-color: #444;
  }
}
</style>
