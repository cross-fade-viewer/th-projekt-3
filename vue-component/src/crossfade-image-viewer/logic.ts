import { ref, onMounted, defineComponent } from 'vue';
import OpenSeadragon from 'openseadragon';
import draggable from 'vuedraggable';

import LayerControl from '../LayerControl.vue';
import ImagePreview from '../ImagePreview.vue';

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

    //TODO: change load logic
    async function loadImageStack() {
      const STANDARD_OPACITY = 100;
      const imageTypes : {[key: string]: string} = {
        irr: 'IRR',
        overall: 'Overall',
        'x-radiograph': 'X-Ray',
        'uv-light': 'UV',
      };
      const results = await fetch(`http://127.0.0.1:8000/artworks/imageStack`, {
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
