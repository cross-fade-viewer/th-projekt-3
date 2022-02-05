
export type ImageCollection = Array<Image>;

export type Image = {
  sourceUrl: string,
  thumbnailUrl?: string,
  title?: string,
  opacity: number,
}

export function prependImageToImageCollection(image: Image, collection: ImageCollection): ImageCollection {
  return [image, ...collection]
}

export function appendImageToImageCollection(image: Image, collection: ImageCollection): ImageCollection {
  return [...collection, image]
}

export function updateOpacityAtIndexInImageCollection(opacity: number, index: number, collection: ImageCollection) {
  if (index < 0 || index > collection.length - 1) throw Error('Index not in range of collection');
  collection[index].opacity = opacity;
  const copy = [...collection];
  copy[index] = {...copy[index], opacity: opacity};
  return copy;
}