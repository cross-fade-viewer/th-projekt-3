import { assert } from "https://deno.land/std/testing/asserts.ts";

import {
  appendImageToImageCollection,
  prependImageToImageCollection,
  updateOpacityAtIndexInImageCollection
} from './cross-fade-viewer-logic.ts'

Deno.test('appendImage', () => {
  const imageToFind = {sourceUrl: '/', opacity: 1, title: 'Image to find'};
  const otherImage = {sourceUrl: '/', opacity: 1, title: 'Image not to find'};
  const collection = appendImageToImageCollection(imageToFind, [otherImage]);
  assert(collection[1] === imageToFind);
});

Deno.test('prependImage', () => {
  const imageToFind = {sourceUrl: '/', opacity: 1, title: 'Some Title'};
  const otherImage = {sourceUrl: '/', opacity: 1, title: 'Some Title'};
  const collection = prependImageToImageCollection(imageToFind, [otherImage]);
  assert(collection[0] === imageToFind);
});

Deno.test('upateOpacity', () => {
  const newOpacity = .5;
  const collection = updateOpacityAtIndexInImageCollection(newOpacity, 0, [{sourceUrl: '_', opacity: 1, title: 'Some Title'}]);
  assert(collection[0].opacity === newOpacity);
});