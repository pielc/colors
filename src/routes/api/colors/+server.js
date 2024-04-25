import { json } from '@sveltejs/kit';
import sharp from 'sharp';
import { reshape } from 'mathjs';
import { read } from '$app/server';
import dh from '../../../../static/images/dh.png';

export async function GET() {
	const image = await read(dh).arrayBuffer();
	const { data, info } = await sharp(image).raw().toBuffer({ resolveWithObject: true });

	const pixData = reshape(Array.from(data), [info.width * info.height, 3]);
	return json({ pixData });
}
