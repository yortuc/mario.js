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

class Vec2{
	constructor(x, y) {
		this.set(x, y);
	}

	set(x, y){
		this.x = x;
		this.y = y;
	}
}

class Entity{
	constructor(){
		this.pos = new Vec2(0,0);
		this.vel = new Vec2(0,0);
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
	
	const mario = new Entity();
	mario.pos.set(62, 64);
	mario.vel.set(4, -6);
	mario.update = function updateMario() {
		mario.pos.x += mario.vel.x;
		mario.pos.y += mario.vel.y;
	}

	const spriteLayer = createSpriteLayer(marioSprite, mario.pos);
	comp.layers.push(spriteLayer);

	function update(){
		comp.draw(context);
		mario.update();
		mario.vel.y += gravity;
		requestAnimationFrame(update);
	}

	update();
});