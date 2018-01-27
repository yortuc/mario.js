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

class Compositor {
	constructor() {
		this.layers = [];
	}

	draw(context){
		this.layers.forEach(layer => layer(context));
	}
}

function createBackgroundLayer(backgrounds, sprites){
	const buffer = document.createElement('canvas');
	buffer.width = canvas.width;
	buffer.height = canvas.height;

	backgrounds.forEach(background=> 
		drawBackground(background, buffer.getContext('2d'), sprites)
	);

	return function drawBackgroundLayer(context){
		context.drawImage(buffer, 0, 0);
	}
}

Promise.all([
	loadMarioSprite(),
	loadBackgroundSprites(), 
	loadLevel('1-1')
]).then(([marioSprite, sprites, level])=>{
	const comp = new Compositor();
	const backgroundLayer = createBackgroundLayer(level.backgrounds, sprites);
	comp.layers.push(backgroundLayer);
	
	const pos = { x: 62, y: 64 };

	function update(){
		comp.draw(context);
		marioSprite.draw('idle', context, pos.x, pos.y);
		pos.x += 2;
		pos.y += 2;
		requestAnimationFrame(update);
	}

	update();
});