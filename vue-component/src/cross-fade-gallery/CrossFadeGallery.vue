<template>
  <div class="gallery">
    <ImagePreview
      v-for="(image, i) in images"
      :key="i"
      :src="image.thumbnailUrl || image.sourceUrl"
      :title="image.title"
      @click="$emit('useImage', i)"
    />
  </div>
</template>

<script src="./gallery-logic.ts" lang="ts"></script>

<style src="./gallery-style.scss" lang="scss"></style>