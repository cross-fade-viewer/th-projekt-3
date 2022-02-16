import { ref, onMounted, defineComponent } from 'vue';
import OpenSeadragon from 'openseadragon';
import draggable from 'vuedraggable';
import { ImageCollection, Image, removeImageFromOneCollectionAndAddToAnother} from '../../../core/cross-fade-viewer-logic';
import LayerControl from '../LayerControl.vue';
import ImagePreview from '../ImagePreview.vue';
import CrossFadeGallery from '../cross-fade-gallery/CrossFadeGallery.vue';

interface Data {
  // TODO: Remove warning
  [key: string]: any
}

export default defineComponent({
  components: {
    LayerControl,
    draggable,
    ImagePreview,
    CrossFadeGallery
  },
  props: {
    availableImages: { type: Array, default: [] },
    displayedImages: { type: Array, default: [] },
    integratedGallery: { type: Boolean, default: true },
    noImageText: {
      type: String,
      // TODO: Translate to english and make text more general.
      default: 'Du hast alle Bildebenen entfernt. Füge neue hinzu, indem du auf das (+) Symbol in der oberen rechten Ecke klickst.'
    },
  },
  setup(props: Data) {
    let viewer : OpenSeadragon.Viewer;

    const showGallery = ref<boolean>(false);
    const selectedLayerIndex = ref<number|undefined>();
    const displayedOpacity = ref<number>(1);
    const unusedImages = ref<ImageCollection>(props.availableImages);
    const usedImages = ref<ImageCollection>(props.displayedImages);

    function selectLayer(index: number) {
      selectedLayerIndex.value = index;
      displayedOpacity.value = usedImages.value[selectedLayerIndex.value].opacity;
    }

    function onUseImage(index: number) {
      useImage(index);
    }
    
    function useImage(index: number) {
      const result = removeImageFromOneCollectionAndAddToAnother(index, unusedImages.value, usedImages.value);
      unusedImages.value = result.removedFromCollection;
      usedImages.value = result.addedToCollection;
      selectLayer(usedImages.value.length - 1);
      viewer.addSimpleImage({url: usedImages.value[usedImages.value.length - 1].sourceUrl})
    }

    function sliderChanged(event: any) {
      const opacity = event.srcElement.value;
      const index = selectedLayerIndex.value || 0;
      usedImages.value[index].opacity = opacity;
      viewer.world.getItemAt(index).setOpacity(opacity);
    }

    function removeImage(index: number) {
      // TODO: Select proper index
      if (selectedLayerIndex.value === index || index < (selectedLayerIndex.value || 0)) {
        selectedLayerIndex.value = usedImages.value.length - 1 > 0 ? usedImages.value.length - 2 : undefined;
      }
      const result = removeImageFromOneCollectionAndAddToAnother(index, usedImages.value, unusedImages.value);
      unusedImages.value = result.addedToCollection;
      usedImages.value = result.removedFromCollection;
      
      viewer.world.removeItem(viewer.world.getItemAt(index));

    }

    onMounted(() => {
      viewer = OpenSeadragon({
        // TODO: Might cause trouble when using our component multiple times.
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

      usedImages.value.forEach((image: Image) => {
        viewer.addSimpleImage({ url: image.sourceUrl });
      });
    });

    return {
      unusedImages,
      usedImages,
      useImage,
      showGallery,
      onUseImage,
      sliderChanged,
      removeImage,
      selectedLayerIndex,
      selectLayer,
      displayedOpacity
    };
  },
});
