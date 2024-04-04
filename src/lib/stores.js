import { writable } from 'svelte/store';

// generator
export const generatorProgress = writable(0);
export const scenario = writable(null);
export const roomAmount = writable(0);

export const prompts = writable({});

// play
export const currentRoomPlaying = writable(null);
