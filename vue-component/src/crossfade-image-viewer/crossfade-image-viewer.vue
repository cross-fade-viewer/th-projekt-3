<template>
  <div class="crossfade-image-viewer">
    <div id="openseadragon">
      <div class="overlay">
        <div class="control-menu">
          <div class="title">Layers{{selectedLayerIndex}}</div>
          <div class="layers">
            <div class="layer-control" :class="{selected: selectedLayerIndex === i}" draggable="true" v-for="(image, i) in usedImages" :key="i">
              <div @click="selectLayer(i)">{{i}}-{{image.title}} ({{(image.opacity*100).toFixed(0)}}%)</div>
              <div class="spacer"></div>
              <button @click="removeImage(i)"><img src="./close.svg"></button>
            </div>
          </div>
          <div class="spacer"></div>
          <div class="opacity-control">
            <img src="./opacity-low.svg">
            <input v-if="selectedLayerIndex !== undefined && usedImages.length" type="range" min="0" max="1" step="0.01" @input="sliderChanged" v-model="displayedOpacity">
            <input v-else type="range" min="0" max="1" step="0.01" disabled>
            <img src="./opacity-high.svg">
          </div>
        </div>
      <!--
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
      -->
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
