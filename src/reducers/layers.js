import { ARTBOARD_LAYER_REF } from '../config';

const layers = (state = {}, { type, layerSymbol, ref }) => {
	if (type === ARTBOARD_LAYER_REF) {
		console.log('REDUCER HIT', state, type, layerSymbol, ref);
		return {
			...state,
			[layerSymbol]: ref
		};
	}

	// console.log('Layer Reducer', state);
	return state;
};

export { layers };
