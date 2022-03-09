<template>
  <div id="cf-viewer-base" class="crossfade-image-viewer base">
    <div id="openseadragon">
      <div class="overlay">
        <div class="control-menu">
          <div class="title">
            <div>Layers</div>
            <img @click="isControlMenuMinimized = !isControlMenuMinimized" class="icon" v-bind:class="isControlMenuMinimized ? 'rotated-270' : 'rotated-90' " src="./arrow.svg">
          </div>
          <div class="controls" v-show="isControlMenuMinimized">
            <div>
              <draggable v-model="usedImagesReverse" item-key="id" @change="onLayerMoved" class="layers">
                <template #item="{element, index}">
                  <div class="layer-control" :class="{selected: reverseIndexOfArray(selectedLayerIndex, usedImages) === index}" draggable="true">
                    <div class="layer-text" @click="selectLayer(reverseIndexOfArray(index, usedImagesReverse))">{{element.title}} ({{(element.opacity*100).toFixed(0)}}%)</div>
                    <button @click="removeImage(reverseIndexOfArray(index, usedImagesReverse))"><img src="./close.svg"></button>
                  </div>
                </template>
              </draggable>
            </div>
            <div class="spacer"></div>
            <div class="nolayerinfo" v-show="usedImages.length < 1">
              {{noImageText}}
            </div>
            <div class="opacity-control">
              <img src="./opacity-low.svg">
              <input v-if="selectedLayerIndex !== undefined && usedImages.length" type="range" min="0" max="1" step="0.01" @input="sliderChanged" v-model="displayedOpacity">
              <input v-else type="range" min="0" max="1" step="0.01" disabled>
              <img src="./opacity-high.svg">
            </div>
          </div>
        </div>
      </div>
    </div>
    <button @click="showGallery = !showGallery" v-if="integratedGallery">
      <img v-bind:class="showGallery ? 'rotated' : '' " src="./arrow.svg">
    </button>
    <div class="gallery-container">
      <cross-fade-gallery :images="unusedImages" v-show="showGallery" @useImage="onUseImage"/>
    </div>
  </div>
</template>

<script src="./logic.ts" lang="ts"></script>

<style src="./../_theme.scss" lang="scss"></style>
