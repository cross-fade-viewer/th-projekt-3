<template>
  <div class="crossfade-image-viewer">
    <div id="openseadragon">
      <div class="overlay">
        <div class="nolayerinfo" v-show="usedImages.length < 1" style="color: white;">
          {{noImageText}}
        </div>
        <div class="slider-container">
          <div class="slider-group" v-for="(image, i) in usedImages" :key="i">
            <input type="range" min="0" max="1" step="0.01" @input="sliderChanged" :data-index="i">
            <span>{{image.title}}</span>
            <button @click="removeImage" :data-index="i">✖️</button>
          </div>
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
