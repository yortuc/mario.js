export default class SpriteSheet{
	constructor(image, tileWidth, tileHeight) {
		this.image = image;
		this.tileWidth = tileWidth;
		this.tileHeight = tileHeight;
		this.tiles = new Map();
	}

	define(name, x, y){
		const buffer = document.createElement('canvas');
		buffer.width = this.tileWidth;
		buffer.height = this.tileHeight;
		buffer
			.getContext('2d')
			.drawImage(
				this.image, 
				x*this.tileWidth, y*this.tileHeight, this.tileWidth, this.tileHeight,	/* source */
				0, 0, this.tileWidth, this.tileHeight									/* target */
			);
		this.tiles.set(name, buffer);
	}

	draw(name, context, x, y){
		const buffer = this.tiles.get(name);
		context.drawImage(buffer, x, y);
	}

	drawTile(name, context, x, y){
		this.draw(name, context, x * this.tileWidth, y * this.tileHeight);
	}
}