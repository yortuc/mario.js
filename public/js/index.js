import {loadImage, loadLevel} from './loader.js';
import Compositor from './Compositor.js';
import {createBackgroundLayer, createSpriteLayer} from './layers.js';
import {createMario} from './entities.js';
import {loadBackgroundSprites} from './sprites.js';

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const gravity = 0.5;

Promise.all([
	createMario(),
	loadBackgroundSprites(), 
	loadLevel('1-1')
]).then(([mario, backgroundSprites, level])=>{
	const comp = new Compositor();
	const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
	comp.layers.push(backgroundLayer);
	
	const spriteLayer = createSpriteLayer(mario);
	comp.layers.push(spriteLayer);

	function update(){
		comp.draw(context);
		mario.update();
		mario.vel.y += gravity;
		requestAnimationFrame(update);
	}

	update();
});