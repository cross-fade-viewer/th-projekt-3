import ImagePreview from '../ImagePreview.vue';

export default {
  props: {
    images: { type: Array, default: [] }
  },
  emits: ['useImage'],
  components: {
    ImagePreview
  }
}
