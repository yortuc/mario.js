function drawBackground(background, context, sprites){
	background.ranges.forEach(([x1, x2, y1, y2])=> {
		for(let i=x1; i<x2; ++i){
			for(let j=y1; j<y2; ++j){
				sprites.drawTile(background.tile, context, i, j);
			}
		}
	})
}

export function createBackgroundLayer(backgrounds, sprites){
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

export function createSpriteLayer(entity){
	return function drawSpriteLayer(context){
		entity.draw(context);
	}
}