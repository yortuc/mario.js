import { loadImage, loadLevel } from './loader.js';
import { loadMarioSprite, loadBackgroundSprites } from './sprites.js';
import Compositor from './Compositor.js';
import { createBackgroundLayer } from './layers.js';

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const gravity = 0.5;

function createSpriteLayer(sprite, pos){
	return function drawSpriteLayer(context){
		sprite.draw('idle', context, pos.x, pos.y);
	}
}

Promise.all([
	loadMarioSprite(),
	loadBackgroundSprites(), 
	loadLevel('1-1')
]).then(([marioSprite, backgroundSprites, level])=>{
	const comp = new Compositor();
	const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
	comp.layers.push(backgroundLayer);
	
	const pos = { x: 62, y: 64 };
	const velocity = { x: 2, y: -10 };

	const spriteLayer = createSpriteLayer(marioSprite, pos);
	comp.layers.push(spriteLayer);

	function update(){
		comp.draw(context);
		pos.x += velocity.x;
		pos.y += velocity.y;
		velocity.y += gravity;
		requestAnimationFrame(update);
	}

	update();
});