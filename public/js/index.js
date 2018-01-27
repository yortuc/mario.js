import SpriteSheet from './SpriteSheet.js';
import { loadImage, loadLevel } from './loader.js';

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

function loadMarioSprite(){
	return loadImage("/img/characters.gif")
		.then(image=> {
			const sprites = new SpriteSheet(image, 16, 16);
			sprites.define('idle', 276, 44, 16, 16);
			return sprites;
		});
}

function loadBackgroundSprites(){
	return loadImage("/img/tiles.png")
		.then(image=> {
			const sprites = new SpriteSheet(image, 16, 16);
			sprites.defineTile("ground", 0, 0);
			sprites.defineTile("sky", 3, 23);
			return sprites;
		});
}

Promise.all([
	loadMarioSprite(),
	loadBackgroundSprites(), 
	loadLevel('1-1')
]).then(([marioSprite, sprites, level])=>{
	console.log(level);
	level.backgrounds.forEach(background=> 
		drawBackground(background, context, sprites)
	);

	marioSprite.draw('idle', context, 64, 64);

});