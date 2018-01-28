import {loadImage, loadLevel} from './loader.js';
import Compositor from './Compositor.js';
import {createBackgroundLayer, createSpriteLayer} from './layers.js';
import {createMario} from './entities.js';
import {loadBackgroundSprites} from './sprites.js';

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

Promise.all([
	createMario(),
	loadBackgroundSprites(), 
	loadLevel('1-1')
]).then(([mario, backgroundSprites, level])=>{
	const comp = new Compositor();
	const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
	// comp.layers.push(backgroundLayer);
	
	const spriteLayer = createSpriteLayer(mario);
	comp.layers.push(spriteLayer);

	const gravity = 30;
	mario.pos.set(62, 180);
	mario.vel.set(200, -400);

	let lastTime = 0;
	const deltaTime = 1/60;
	let accumulatedTime = 0;

	function update(time){
		accumulatedTime += (time - lastTime)/1000;

		while(accumulatedTime > deltaTime){
			comp.draw(context);
			mario.update(deltaTime);

			mario.vel.y += gravity;
			requestAnimationFrame(update);

			accumulatedTime -= deltaTime;
		}
		requestAnimationFrame(update);
		lastTime = time;
	}

	update(0);
});