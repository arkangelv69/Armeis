//Ejemplos raphael
var funcionInicio = function ($){
	var area = new Object;
	area = {
		targetDiv:'#workArea'
	};
	var layers = new Object;
	layers = {
		layerActual:{}
	};
	var events = new Object;
	events = {
		select:'select',
		inicialClick:true,
		empezarRecta:false,
		eventsMouse:{
			drawSelect: function(){
				$('#select').click(function(){
					events.select = 'select';
					$(area.targetDiv).off();
					$(area.targetDiv+' path').off();
					events.eventsDraw[events.select]();
				});
			},
			drawRect:function(){
				$('#rect').click(function(){
					events.select = 'rect';
					$(area.targetDiv).off();
					$(area.targetDiv+' path').off();
					events.eventsDraw[events.select]();
				});	
			},
			drawClean:function(){
				$('#clean').click(function(){
					events.select = 'clean';
					$(area.targetDiv).off();
					events.eventsDraw[events.select]();
				});	
			},
			drawAddLayer:function(){
				$('#addLayer').click(function(){
					events.select = 'addLayer';
					$(area.targetDiv).off();
					$(area.targetDiv+' path').off();
					events.eventsDraw[events.select]();
				});	
			}
		},
		eventsDraw:{
			select:function(){
				$(area.targetDiv+' path').click(function(event){
					$(this).css({'fill':'red'});
				});
			},
			rect:function(){
				$(area.targetDiv).click(function(event){
					events.empezarRecta = true;
					if(events.inicialClick){	
						var x1 = event.offsetX;
						var y1 = event.offsetY;
						var path = "M"+x1+","+y1;
						var area = layers.layerActual;
						var colorStroke = colors.stroke();
						var colorFill = colors.fill();
						objects.recta = area.path(path).attr({"fill":colorFill,"stroke":colorStroke,"stroke-width":3});	
					}else{
						events.inicialClick = true;
					}
				});
				$(area.targetDiv).mousemove(function(event) {
					if(events.empezarRecta){
						var x2 = event.offsetX;
						var y2 = event.offsetY;
						var path ="";
						if( events.inicialClick ){
							if(objects.recta.attr("path"))path = objects.recta.attr("path");					
							events.inicialClick = false;
							path = path + "L"+x2+","+y2;
						}else{
							var object = objects.recta.attrs.path;
							var size = object.length;
							for(var i= 0; i < size; i++){
								if( i == size-1 && size > 1 ){
									path += "L"+x2+","+y2;
								}else {
									path += object[i][0]+object[i][1]+','+object[i][2];
								}
							}

						}
						objects.recta.attr({
							"path":path,
						});
					}
				});
				$(area.targetDiv).dblclick( function (event) {
					var x2 = event.offsetX, y2 = event.offsetY;
					var colorStroke = colors.stroke();
					var colorFill = colors.fill();
					var path = "";
					if(objects.recta.attr("path"))path = objects.recta.attr("path");
					objects.recta.attr({
							"path":path+"Z",
							"stroke":colorStroke,
							"fill":colorFill
						});
					$(area.targetDiv).off();
					events.empezarRecta = false;
					events.eventsDraw[events.select]();
				});
			},
			clean:function(){
				$(area.targetDiv+' path').click(function(event){
					$(this).remove();
				});
			},
			addLayer:function(){
				layers.layerActual = Raphael('objeto',800, 430);
			}
		}
	};
	var objects = new Object;
	objects = {
		recta:{}
	};
	var colors = new Object;
	colors = {
		fill:function(){
			return $('#innerColor').val();
		},
		stroke:function(){
			return $('#borderColor').val();
		}
	};
	$(document).ready(function (){

		var html = '<div id="objeto"></div>';
		$(area.targetDiv).append($(html));
		layers.layerActual = Raphael('objeto',800, 430);

		//Seleccionar herramienta
		events.eventsMouse.drawSelect();
		events.eventsMouse.drawRect();
		events.eventsMouse.drawClean();
		events.eventsMouse.drawAddLayer();
		
		//Usar herramienta línea
		events.eventsDraw[events.select];

		//Pruebas
		/*var html = '<div id="objeto"></div>';
		$(area.targetDiv).append($(html));
		var area = Raphael('objeto',600, 600);
		var recta = area.path("M10,10l300,0").attr({fill:'#000',strok:'#000','stroke-width':3});
		recta.attr({
			path:"M10,10l300,10"
		});*/
	});
}(jQuery);