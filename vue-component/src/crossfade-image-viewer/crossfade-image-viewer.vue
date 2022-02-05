<template>
  <div class="crossfade-image-viewer">
    <div id="openseadragon">
      <div class="overlay">
        <div class="nolayerinfo" v-show="usedImages.length < 1" style="color: white;">
          {{noImageText}}
        </div>
      </div>
    </div>
    <button @click="showGallery = !showGallery" v-if="integratedGallery">👁</button>
    <div class="gallery">
      <cross-fade-gallery :images="unusedImages" v-show="showGallery" @useImage="onUseImage"/>
    </div>
  </div>
</template>

<script src="./logic.ts" lang="ts"></script>

<style src="./style.scss" lang="scss"></style>
