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

  setup() {
    type Layer = {
      name: string,
      opacity: number,
      url: string,
      thumbnail ?: string,
    }

    type Image = {
      url: string,
      title?: string,
      thumbUrl?: string,
    }

    // props for debugging
    // const testImages: any[] = [];
    // function getAllTestImages() {
    //   testImages.push(
    //     {
    //       url: `https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80`,
    //     },
    //     {
    //       name: 'Test Image 2',
    //       url: `https://images.unsplash.com/photo-1495360010541-f48722b34f7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80`,
    //     },
    //     {
    //       name: 'Test Image 3',
    //       url: `https://images.unsplash.com/photo-1548247416-ec66f4900b2e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80`,
    //     },
    //     {
    //       test: 'invalid Type',
    //     }
    //   );
    // }

    const layerImages = ref<Image[]>([]);
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

    const loadImageStack = () => {

      // for Debugging
      // getAllTestImages();
      // layerImages.value = testImages;

      const STANDARD_OPACITY = 100;

      if(!layerImages) {
        return console.error("Error: no image layers were provided.");
      }

      layerImages.value.forEach( (image: Image, index: number) => {

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
          console.error(error.message);
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
