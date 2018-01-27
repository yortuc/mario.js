export default class SpriteSheet{
	constructor(image, tileWidth, tileHeight) {
		this.image = image;
		this.tileWidth = tileWidth;
		this.tileHeight = tileHeight;
		this.tiles = new Map();
	}

	define(name, x, y, width, height){	// position of the sprite on the resource image
		const buffer = document.createElement('canvas');
		buffer.width = width;
		buffer.height = height;
		buffer
			.getContext('2d')
			.drawImage(
				this.image, 
				x, y, width, height,	/* source */
				0, 0, width, height		/* target */
			);
		this.tiles.set(name, buffer);
	}

	defineTile(name, x, y){
		this.define(name, x*this.tileWidth, y*this.tileHeight, this.tileWidth, this.tileHeight);
	}

	draw(name, context, x, y){
		const buffer = this.tiles.get(name);
		context.drawImage(buffer, x, y);
	}

	drawTile(name, context, x, y){
		this.draw(name, context, x * this.tileWidth, y * this.tileHeight);
	}
}