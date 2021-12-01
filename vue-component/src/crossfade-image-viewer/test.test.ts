type Layer = {
  name: string,
  opacity: number,
}

function addLayerToLayers(layer : Layer, layers : Array<Layer>) {
  return [layer, ...layers];
}

test('Test addLayerToLayers Function', () => {
  const layers : Array<Layer> = [];
  const layer : Layer = { name: 'Some Layer', opacity: .5 };
  const newLayers = addLayerToLayers(layer, layers);
  expect(layers.length).toBe(0);
  expect(newLayers.length).toBe(1);
  expect(newLayers[0]).toBe(layer);
});
