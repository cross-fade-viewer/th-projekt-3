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
          <!--
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
          -->
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

<script src="./crossfade-image-viewer/logic.ts" lang="ts"></script>
<style src="./crossfade-image-viewer/style.scss" lang="scss"></style>
