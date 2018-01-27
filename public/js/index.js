import { loadImage, loadLevel } from './loader.js';
import { loadMarioSprite, loadBackgroundSprites } from './sprites.js';

function drawBackground(background, context, sprites){
	background.ranges.forEach(([x1, x2, y1, y2])=> {
		for(let i=x1; i<x2; ++i){
			for(let j=y1; j<y2; ++j){
				sprites.drawTile(background.tile, context, i, j);
			}
		}
	})
}

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

Promise.all([
	loadMarioSprite(),
	loadBackgroundSprites(), 
	loadLevel('1-1')
]).then(([marioSprite, sprites, level])=>{

	const backgroundBuffer = document.createElement('canvas');
	backgroundBuffer.width = canvas.width;
	backgroundBuffer.height = canvas.height;

	level.backgrounds.forEach(background=> 
		drawBackground(background, backgroundBuffer.getContext('2d'), sprites)
	);

	const pos = { x: 62, y: 64 };

	function update(){
		context.drawImage(backgroundBuffer, 0, 0);
		marioSprite.draw('idle', context, pos.x, pos.y);
		pos.x += 2;
		pos.y += 2;
		requestAnimationFrame(update);
	}

	update();
});