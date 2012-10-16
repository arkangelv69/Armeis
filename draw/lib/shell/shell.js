//Ejemplos raphael
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
			case 'height':
				return sizeAreaWork.width();
				break;
			case 'width':
				return sizeAreaWork.height();
				break;
		}
	},
	render:function(){
		//Primera capa
		var html = '<div id="objeto"></div>';
		$(area.targetDiv).append($(html));
		control.paper.push(Raphael('objeto',800, 430));
		$( "#objeto" ).children().first().data('layer',control.numLayers);
		$( "#itemLayers" ).sortable();
        $( "#itemLayers" ).disableSelection();
        $( "#itemLayers li" ).first().data('layer',control.numLayers);
        control.numLayers++;

		//Seleccionar herramienta
		draw.eventsMouse.drawSelect();
		draw.eventsMouse.drawRect();
		draw.eventsMouse.drawClean();

		//Eventos de control
		control.eventsMouse.controlAddLayer();
		control.eventsMouse.controlOrderLayer();
		control.eventsMouse.controlSelectLayer();
		
		//Usar herramienta línea
		draw.eventsDraw[draw.select];
	}
};
var render = function ($){
	$(document).ready(function (){
		shell.render();	
	});
}(jQuery);