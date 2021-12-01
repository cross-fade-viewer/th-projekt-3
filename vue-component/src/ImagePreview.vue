<template>
  <div class="image-preview" @click="$emit('click')">
    <div class="image">
      <img :src="src">
    </div>
    <dl class="info">
      <dt>{{title}}</dt>
      <dd>
        {{ description ? description : '' }}
      </dd>
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
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #222;
  .image {
    position: relative;
    height: 100%;
    background-color: rgba(0,0,0,.04);
  }
  img {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    -o-object-fit: contain;
    object-fit: contain;
  }
  .info {
    margin: 0;
    background-color: #444444;
    flex-grow: 1;
    padding: .8rem;
    color: #f2f2f2;
    border-top: 1px solid #fc0;
    background-color: #444;
  }
}
</style>
