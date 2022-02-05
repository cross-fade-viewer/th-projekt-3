import { assert, assertEquals } from "https://deno.land/std/testing/asserts.ts";

import {
  appendImageToImageCollection,
  prependImageToImageCollection,
  updateOpacityAtIndexInImageCollection,
  removeImageFromImageCollection,
  ImageCollection,
  removeImageFromOneCollectionAndAddToAnother
} from './cross-fade-viewer-logic.ts'

Deno.test('appendImage', () => {
  const imageToFind = {sourceUrl: '/', opacity: 1, title: 'Image to find'};
  const otherImage = {sourceUrl: '/', opacity: 1, title: 'Image not to find'};
  const collection = appendImageToImageCollection(imageToFind, [otherImage]);
  assertEquals(collection[1], imageToFind);
});

Deno.test('prependImage', () => {
  const imageToFind = {sourceUrl: '/', opacity: 1, title: 'Some Title'};
  const otherImage = {sourceUrl: '/', opacity: 1, title: 'Some Title'};
  const collection = prependImageToImageCollection(imageToFind, [otherImage]);
  assertEquals(collection[0], imageToFind);
});

Deno.test('upateOpacity', () => {
  const newOpacity = .5;
  const collection = updateOpacityAtIndexInImageCollection(newOpacity, 0, [{sourceUrl: '_', opacity: 1, title: 'Some Title'}]);
  assert(collection[0].opacity === newOpacity);
});

Deno.test('deleteAtIndex', () => {
  const element1 = {sourceUrl: '/', opacity: 1, title: 'Element 1'};
  const element2 = {sourceUrl: '/', opacity: 1, title: 'Element 2'};
  const collection = [element1, element2];
  const smallerCollection = removeImageFromImageCollection(0, collection);
  assert(smallerCollection.length === 1);
  assertEquals(smallerCollection[0], element2);
});

Deno.test('swapImageBetweenTwoCollections', () => {
  const collection1: ImageCollection = [{sourceUrl: '/', opacity: 1, title: 'Element 1'}];
  const collection2: ImageCollection = [];
  
  const {removedFromCollection, addedToCollection} = removeImageFromOneCollectionAndAddToAnother(0, collection1, collection2);

  assert(removedFromCollection.length === 0);
  assert(addedToCollection.length === 1);
})