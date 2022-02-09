<script lang="ts">
import { defineComponent } from 'vue';
import CrossfadeImageViewer from '@/crossfade-image-viewer/crossfade-image-viewer.vue';
import CrossFadeGallery from '@/cross-fade-gallery/CrossFadeGallery.vue';
import { ImageCollection } from '../../core/cross-fade-viewer-logic';

export default defineComponent({
  name: 'ServeDev',
  components: {
    CrossfadeImageViewer,
    CrossFadeGallery
  },
  setup() {
    let availableImages: ImageCollection = [
      {title: 'Some Title A', sourceUrl: 'https://i.picsum.photos/id/494/1500/1800.jpg?hmac=rJgjnXxtUmsZnV0nNVlj5F1722L_q7xPXd8VZCuFIfg', opacity: 1},
      {title: 'Some Title B', sourceUrl: 'https://i.picsum.photos/id/488/1500/1800.jpg?hmac=6ud2dfPTZES5EkC07m-Yh_s6TkXABFw8VO3h4meR884', opacity: 1},
      {title: 'Some Title C', sourceUrl: 'https://i.picsum.photos/id/911/1500/1800.jpg?hmac=XZ1nsfj9Skb4V6EwZPnCLxQnMC-2MFuwlsjAQ9yqsok', opacity: 1},
    ]
    let displayedImages: ImageCollection = [
      //{title: 'Some Title D', sourceUrl: 'https://i.picsum.photos/id/398/1500/1800.jpg?hmac=arRnFqZvf1PoJpNYzznhdOMx9veRHgTcyf3mM2wxFpY', opacity: 1},
    ]
    return { availableImages, displayedImages };
  },
});
</script>

<template>
  <div id="app">
    <div class="container center">
      <div class="component">
        <crossfade-image-viewer :availableImages="availableImages" :displayedImages="displayedImages" :integratedGallery="true"/>
      </div>
      <!--
      <div class="component">
        <cross-fade-gallery/>
      </div>
      -->
    </div>
  </div>
</template>

<style lang="scss">
body, html {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
}
</style>

<style lang="scss" scoped>
#app {
  width: 100vw;
  height: 100vh;
  background-color: #efefef;
}

.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.left {
  justify-content: left;
  align-items: left;
}

.center {
  justify-content: center;
  align-items: center;
}

.component {
  width: 100%;
  height: 100%;
}

.small {
  height: 50vh;
  width: 50vh;
}
</style>
