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
      type: Boolean,
      // TODO: Translate to english and make text more general.
      default: 'Du hast alle Bildebenen entfernt. Füge neue hinzu, indem du auf das (+) Symbol in der oberen rechten Ecke klickst.'
    },
  },
  setup(props: Data) {
    let viewer : OpenSeadragon.Viewer;

    const showGallery = ref<boolean>(false);
    const unusedImages = ref<ImageCollection>(props.availableImages);
    const usedImages = ref<ImageCollection>(props.displayedImages);

    function onUseImage(index: number) {
      useImage(index);
    }
    
    function useImage(index: number) {
      const result = removeImageFromOneCollectionAndAddToAnother(index, unusedImages.value, usedImages.value);
      unusedImages.value = result.removedFromCollection;
      usedImages.value = result.addedToCollection;
      viewer.addSimpleImage({url: usedImages.value[usedImages.value.length - 1].sourceUrl})
    }

    function sliderChanged(event: any) {
      const opacity = event.srcElement.value;
      const index = event.srcElement.dataset.index;
      usedImages.value[index].opacity = opacity;
      viewer.world.getItemAt(index).setOpacity(opacity);
    }

    function removeImage(event: any) {
      const index = event.srcElement.dataset.index;
      // Bild aus Viewer löschen
      viewer.world.removeItem(viewer.world.getItemAt(index));

      // Bild von used wieder in unused packen
      const result = removeImageFromOneCollectionAndAddToAnother(index, usedImages.value, unusedImages.value);
      unusedImages.value = result.addedToCollection;
      usedImages.value = result.removedFromCollection;
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

    return {unusedImages, usedImages, useImage, showGallery, onUseImage, sliderChanged, removeImage};
  },
});
