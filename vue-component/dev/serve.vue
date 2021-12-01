<script lang="ts">
import { defineComponent } from 'vue';
import CrossfadeImageViewer from '@/crossfade-image-viewer.vue';

export default defineComponent({
  name: 'ServeDev',
  components: {
    CrossfadeImageViewer
  }
});
</script>

<template>
  <div id="app">
    <crossfade-image-viewer />
  </div>
</template>
