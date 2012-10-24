//Own David Muñoz Sánchez
//Versión Beta 16-10-2012
//Shell
var shell = new Object();
shell = {
	positionRelative:function(event, coord){
		var positionXY = $(area.targetDiv).offset();
		switch (coord){
			case 'x':
				return event.pageX - positionXY.left;
				break;
			case 'y':
				return event.pageY - positionXY.top;
				break;
		}
	},
	positionAbsolute:function(event, coord){
		switch (coord){
			case 'x':
				return event.pageX;
				break;
			case 'y':
				return event.pageY;
				break;
		}
	},
	sizeAreaWork:function(type){
		var sizeAreaWork = $(area.targetDiv);
		switch (type){
			case 'width':
				return sizeAreaWork.width();
				break;
			case 'height':
				return sizeAreaWork.height();
				break;
		}
	},
	tras:function(word){
		return word;
	},
	drag:{
		start:function(){
			this.odx = 0;
			this.ody = 0;
			this.animate({"fill-opacity": 0.2}, 500);
			objects.select.tempClean();
			objects.select.tempDraw();
		},
		move:function(dx,dy){
			this.translate(dx - this.odx, dy - this.ody);
			this.odx = dx;
			this.ody = dy;
			objects.select.tempClean();
			objects.select.tempDraw();
		},
		up:function(){
			this.animate({"fill-opacity": 1}, 500);
			objects.select.tempClean();
			objects.select.tempDraw();
		}
	},
	render:function(){
		//Primera capa
		var html = '<div id="objeto"></div>';
		$(area.targetDiv).append($(html));
		control.paper.push({raphael:Raphael('objeto',shell.sizeAreaWork('width'), shell.sizeAreaWork('height')),idLayers:control.numLayers});
		control.paper[0].raphael.canvas.id = control.numLayers;
		$( "#itemLayers" ).sortable();
        $( "#itemLayers" ).disableSelection();
        $( "#itemLayers" ).children("li").first().data('layer',control.numLayers);

		//Seleccionar herramienta
		draw.eventsMouse.drawSelect();
		draw.eventsMouse.drawRect();
		draw.eventsMouse.drawClean();

		//Eventos de control
		control.eventsMouse.controlAddLayer();
		control.eventsMouse.controlOrderLayer();
		control.eventsMouse.controlSelectLayer();
		control.eventsMouse.controlSetPropertysObjects();
		
		//Usar herramienta línea
		draw.eventsDraw[draw.select];
	}
};
var render = function ($){
	$(document).ready(function (){
		shell.render();	
	});
}(jQuery);