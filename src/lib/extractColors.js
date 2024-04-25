// @ts-nocheck
import skmeans from 'skmeans';
import { round } from 'mathjs';

/**
 * Convert pixel number in its hexa value
 * @param {Number} c
 * @returns
 */
export function componentToHex(c) {
	const hex = round(c).toString(16);
	return hex.length == 1 ? '0' + hex : hex;
}

/**
 * Convert rgb pixel values to hex value
 * @param {Number} r pixel red attribute
 * @param {Number} g pixel green attribute
 * @param {Number} b pixel blue attribute
 * @returns
 */
export function rgbToHex(r, g, b) {
	return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export const extractColors = (pixels) =>
	new Promise((res, rej) => {
		console.log('tip');
		const result = skmeans(pixels, 7, 'kmpp', 3000);
		console.log('top');

		const colors = result.centroids.map((/** @type {number[]} */ e) => {
			return rgbToHex(e[0], e[1], e[2]);
		});

		res(colors);
	});
