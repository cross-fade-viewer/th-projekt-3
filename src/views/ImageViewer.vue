<template>
  <div id="root">

    <div id="openseadragon">

      <div id="ccf-viewer-ui">
        <div id="action-buttons">
          <button class="btn btn-primary icon-ebenen-hinzufuegen"
            @click="showOrHideAside('layers')"/>
        </div>
        <div id="view-buttons">
          <button class="btn btn-primary"
            @click="toggleFullscreen"
            v-bind:class="[isFullscreen ?
              'icon-exit-full-screen' : 'icon-fullscreen']"/>
        </div>
      </div>

      <div class="overlay">
        <div class="nolayerinfo" v-show="layers.length < 1">
          Du hast alle Bildebenen entfernt. Füge neue hinzu,
          indem du auf das (+) Symbold in der oberen rechten Ecke klickst.
        </div>
        <div class="layer-container" v-show="!(layers.length < 1)">
          <draggable
            v-model="layers"
            tag="transition-group"
            handle=".handle"
            @change="detectLayerChange"
            ghostClass="ghost"
            dragClass="ghost"
            chosenClass="ghost"
            animation="150"
            item-key="url">

            <template #item="{element, index}">
              <transition name="fade">
                <div v-show="uiZeigen">
                  <LayerControl
                    :text="element.name"
                    v-model="element.opacity"
                    @input="updateOpacity(index)"
                    @delete="removeLayer(index)"
                    class="slider">
                  </LayerControl>
                </div>
              </transition>
            </template>
          </draggable>
          <button class="btn btn-light icon-up-arrow"
            style="position: relative; align-self: end; margin: 0 auto;"
            v-on:click="uiZeigen = !uiZeigen"
            v-bind:class="[uiZeigen ? 'rotated' : '']"></button>
        </div>
      </div>

    </div>

    <div class="aside" v-if="asideToShow === 'layers'">
      <div class="controls-container">
        <button class="btn btn-secondary icon-close"
          @click="showOrHideAside('layers')"></button>
      </div>
      <h2>Weitere Aufnahmen</h2>
      <div id="message" v-if="possibleLayers.length <= 0">
         Leider können Sie keine weitere Ebenen hinzufügen,
         da es keine weitere Aufnahme für dieses Werk gibt.
      </div>
      <div class="gallery">
        <ImagePreview
          v-for="(layer, i) in possibleLayers"
          :key="i"
          :src="layer?.thumbnail"
          :title="layer?.name"
          @click="addPossibleLayerToLayers(i)"
        />
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import OpenSeadragon from 'openseadragon';
import draggable from 'vuedraggable';

import LayerControl from '../components/LayerControl.vue';
import ImagePreview from '../components/ImagePreview.vue';

let viewer : OpenSeadragon.Viewer;

export default defineComponent({
  components: { LayerControl, draggable, ImagePreview },
  setup() {
    type Layer = {
      name: string,
      opacity: number,
      url: string,
      thumbnail ?: string,
    }

    type Artwork = {
      name: string,
      id: string,
      src: string,
    }

    const route = useRoute();
    const uiZeigen = ref<boolean>(true);
    const isFullscreen = ref<boolean>(false);
    const possibleLayers = ref<Layer[]>([]);
    const layers = ref<Layer[]>([]);

    const asideToShow = ref<string>();
    function showOrHideAside(asideName: string) {
      console.log(asideName);
      if (asideToShow.value === '' || asideToShow.value !== asideName) {
        asideToShow.value = asideName;
      } else {
        asideToShow.value = '';
      }
    }

    async function getImageInfo() {
      const results = await fetch(`http://127.0.0.1:8000/artworks/${route.params.artworkId}`, {
        method: 'GET',
      }).then((response) => response.json())
        .then((json) => json)
        .catch((error) => console.log(`Fetching ImageInfo failed: ${error}`));
      return results;
    }

    const reverseIndex = (index: number) => layers.value.length - 1 - index;

    function updateOpacity(index : number) {
      viewer.world.getItemAt(reverseIndex(index)).setOpacity(layers.value[index].opacity / 100);
    }

    function addLayer(layer : Layer) {
      layers.value.unshift(layer);
      viewer.addSimpleImage({
        url: layer.url,
      });
    }

    function removeLayer(index : number) {
      viewer.world.removeItem(viewer.world.getItemAt(reverseIndex(index)));
      possibleLayers.value.push(layers.value.splice(index, 1)[0]);
    }

    function addPossibleLayerToLayers(index : number) {
      addLayer(possibleLayers.value.splice(index, 1)[0]);
    }

    type LayerChange = {
      moved: {
        element: Record<string, unknown>,
        newIndex: number,
        oldIndex: number
      }
    }

    function detectLayerChange(changed : LayerChange) {
      const item = viewer.world.getItemAt(reverseIndex(changed.moved.oldIndex));
      viewer.world.removeItem(item);
      viewer.world.addItem(item, { index: reverseIndex(changed.moved.newIndex) });
    }

    //TODO: change load logic
    async function loadImageStack() {
      const STANDARD_OPACITY = 100;
      const imageTypes : {[key: string]: string} = {
        irr: 'IRR',
        overall: 'Overall',
        'x-radiograph': 'X-Ray',
        'uv-light': 'UV',
      };
      const results = await fetch(`http://127.0.0.1:8000/artworks/${route.params.artworkId}/imageStack`, {
        method: 'GET',
      }).then((response) => response.json())
        .then((json) => json)
        .catch((error) => console.log(`Fetching ImageStack failed: ${error}`));

      Object.keys(results.imageStack).filter(() => true).forEach((imageType) => {
        if (!(imageType in imageTypes)) {
          return;
        }

        let i : number;
        for (i = 0; i < results.imageStack[imageType].images.length; i += 1) {
          const originalImageData = results.imageStack[imageType].images[i].origin;
          const thumbnailImageData = results.imageStack[imageType].images[i].small;
          const originalPath = originalImageData.path;
          const originalSrc = originalImageData.src;
          const smallPath = thumbnailImageData.path;
          const smallSrc = thumbnailImageData.src;

          possibleLayers.value.push({
            name: imageTypes[imageType],
            opacity: STANDARD_OPACITY,
            url: `http://localhost:8000/${results.basePath}/${originalPath}/${originalSrc}`,
            thumbnail: `http://localhost:8000/${results.basePath}/${smallPath}/${smallSrc}`,
          });
        }
      });
      addPossibleLayerToLayers(0);
    }

    onMounted(async () => {
      viewer = OpenSeadragon({
        id: 'openseadragon',
        showNavigator: true,
        showNavigationControl: false,
        showZoomControl: false,
        showHomeControl: false,
        showFullPageControl: false,
        showRotationControl: false,
        showFlipControl: false,
        showSequenceControl: false,
        showReferenceStrip: false,
      });

      layers.value.forEach((layer) => {
        viewer.addSimpleImage({ url: layer.url });
      });

      loadImageStack();

      document.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement) {
          isFullscreen.value = true;
        } else {
          isFullscreen.value = false;
        }
      });

    });

    function toggleFullscreen() {
      // UI verstecken außer Vollscreen button
      const element = document.querySelector('#root');

      if (!element) {
        return console.log('kein Element #root gefunden');
      }

      if (!document.fullscreenElement) {
        return element.requestFullscreen()
          .then(() => {
            // element has entered fullscreen mode successfully
          })
          .catch((error: Error) => {
            // element could not enter fullscreen mode
            // error message
            console.log(error.message);
          });
      }
      return document.exitFullscreen()
        .then(() => {
          // element has exited fullscreen mode
        })
        .catch((error: Error) => {
          // element could not exit fullscreen mode
          // error message
          console.log(error.message);
        });
    }

    return {
        addPossibleLayerToLayers,
        asideToShow,
        detectLayerChange,
        isFullscreen,
        layers,
        possibleLayers,
        removeLayer,
        showOrHideAside,
        toggleFullscreen,
        uiZeigen,
        updateOpacity,
    };
  },

});

</script>

<style lang="scss" scoped>
    @import '../styles/_styleguide.scss';

    body, html {
    height: 100vh;
    width: 100vh;
    overflow: hidden;
    margin: 0;
    }

    @media only screen and (max-width: 750px) {
    #root {
        display: grid;
        grid-template-columns: 0fr 1fr;
    }
    }

    #root {
    display: grid;
    grid-template-columns: 1fr auto;
    }

    #openseadragon {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 0;
    background-color: rgb(29, 28, 28);
    }

    #ccf-viewer-ui {
    position: absolute;
    height: 100vh;
    right: 0;
    }

    .overlay {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding: 20px;
    .nolayerinfo {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 80%;
        font-size: 1.3em;
    }
    }

    .layer-container {
    width: 95%;
    display: flex;
    flex-direction: column;
    pointer-events: all;
    gap: $space1;
    }

    @media only screen and (min-width: 512px){
    .layer-container {
        width: 80%;
    }
    }

    @media only screen and (min-width: 1024px){
    .layer-container {
        width: 60%;
    }
    }

    .slider {
    pointer-events: all;
    }

    .input {
    width: 75%;
    background-color: #e9c602fd;
    }
    // Base Colors
    $shade-10: #2c3e50 !default;
    $shade-1: #d7dcdf !default;
    $shade-0: #fff !default;
    $teal: #1abc9c !default;

    // Reset
    * {
    &,
    &:before,
    &:after {
        box-sizing: border-box;
    }
    }
    .draggable * {
    transition: transform 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
    .ghost {
    transform: scale(1.01);
    border-radius: 10px;
    background-color: rgba(239, 239, 239, 0.185);
    }

    .rotated {
    transform: rotate(180deg);
    transition: transform 0.5s ease-in-out;
    }

    .gallery {
    padding-top: 1.3rem;
    display: grid;
    column-gap: 1.3rem;
    row-gap: 1.3rem;
    grid-auto-rows: 400px;
    grid-template-columns: repeat(1,1fr);
    height: 200px;
    }

    @media only screen and (min-width: 512px){
    .gallery {
        grid-template-columns: repeat(2,1fr);
    }
    }
</style>
