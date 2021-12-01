<template>
  <div class="layer-control">
    <button
      class="btn btn-light icon-close-light"
      style="margin: 0; padding: 0; background-size: 20px;"
      @click="$emit('delete')"
    ></button>
    <div
      class="btn btn-light icon-ebenen-verschieben handle"
      style="margin: 0; padding: 0; background-size: 30px;"
    ></div>
    <input
      type="range"
      min="0"
      max="100"
      v-model="opacity"
      @input="$emit('update:modelValue', opacity)"
    />
    <div class="text">{{text}}</div>
  </div>
</template>

<script>
import { ref, defineComponent } from 'vue';

export default defineComponent({
  name: 'LayerControl',
  props: { text: String, modelValue: String },
  emits: ['update:modelValue', 'delete'],
  setup() {
    const opacity = ref(100);
    return { opacity };
  },
});
</script>

<style lang="scss" scoped>
@import '../styles/_styleguide.scss';
.layer-control {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  width: 100%;
  gap: 10px;
  opacity: .5;
  transition: all cubic-bezier(0.075, 0.82, 0.165, 1) .5s;
  &:hover {
    opacity: 1;
  }
}
input {
  background: $color-lightest;
  height: 3px;
  width: 100%;
}
input[type=range] {
  height: 5px;
  -webkit-appearance: none;
  margin: 10px 0;
  width: 100%;
}
input[type=range]:focus {
  outline: none;
}
/* Thumb in Chromium */
input[type=range]::-webkit-slider-thumb {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  background-color: #ffffff;
  background-image: url(../assets/img/slider.svg);
  background-position: center center;
  background-size: contain;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -17px;
}
input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 2px;
  cursor: pointer;
  box-shadow: 0px 0px 0px #000000;
  background: #FFFFFF;
  border-radius: 3px;
}
/* Thumb in Firefox */
input::-moz-range-thumb {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: $color-lightest;
  border-radius: 100%;
  background-image: url(../assets/img/slider.svg);
  background-position: center center;
  background-size: cover;
  border: none;
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
  &:focus {
    outline: none;
  }
}
.move-handler {
  min-width: 40px;
  min-height: 40px;
  background-image: url(../assets/img/ebenen-verschieben.svg);
  background-repeat: no-repeat;
  background-position: center center;
  cursor: grab;
}
.handle {
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
}
.text {
  width: 100px;
  font-size: $space4;
}
</style>
