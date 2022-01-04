import { ref, onMounted, defineComponent } from 'vue';
import OpenSeadragon from 'openseadragon';
import draggable from 'vuedraggable';

import LayerControl from '../LayerControl.vue';
import ImagePreview from '../ImagePreview.vue';

let viewer : OpenSeadragon.Viewer;

export default defineComponent({
  components: {
    LayerControl,
    draggable,
    ImagePreview,
  },

  props: {
    layerImages: {
      type: Array,
      required: true,
    },
  },

  setup() {
    type Layer = {
      name: string,
      opacity: number,
      url: string,
      thumbnail ?: string,
    }

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

    //TODO: check how props are passed, I'm too dumb :(
    const loadImageStack = async () => {
      const STANDARD_OPACITY = 100;
      type Image = {
        url: string,
        title?: string,
        thumbUrl?: string,
      }

      if(!this.layerImages || this.layerImages.length === 0) {
        return console.error("Error: no image layers were provided.");
      }

      this.layerImages.forEach( (image: Image, index: number) => {

        //check if title exists, else generate some alternative
        const imageTitle = image.title ? image.title : 'layerImage-'+index;
        //check if url exists
        if (!image.url) {
          return console.error("Error: no url found in image data.");
        }
        //check if thumbnail url exists, else use regular url
        const thumbnailImageURL = image.thumbUrl ? image.thumbUrl : image.url;

        possibleLayers.value.push({
          name: imageTitle,
          opacity: STANDARD_OPACITY,
          url: image.url,
          thumbnail: thumbnailImageURL,
        });
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
