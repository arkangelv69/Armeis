//Ejemplos raphael
var funcionInicio = function ($){
	var area = new Object;
	area = {
		targetDiv:'#workArea'
	}
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
					events.eventsDraw[events.select]();
				});
			},
			drawRect:function(){
				$('#rect').click(function(){
					events.select = 'rect';
					$(area.targetDiv).off();
					events.eventsDraw[events.select]();
				});	
			}
		},
		eventsDraw:{
			select:function(){

			},
			rect:function(){
				$(area.targetDiv).click(function(event){
					events.empezarRecta = true;
					if(events.inicialClick){	
						var x1 = event.offsetX;
						var y1 = event.offsetY;
						var path = "M"+x1+","+y1;
						var area = Raphael('objeto',600, 600);
						var colorStroke = colors.stroke()
						objects.recta = area.path(path).attr({"stroke":colorStroke,"stroke-width":3});	
					}else{
						events.inicialClick = true;
					}
				});
				$(area.targetDiv).mousemove(function(event) {
					if(events.empezarRecta){
						var x2 = event.offsetX;
						var y2 = event.offsetY;
						var colorStroke = colors.stroke();
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
							"stroke":colorStroke
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
							"path":path+"z",
							"stroke":colorStroke,
							"fill":colorFill
						});
					$(area.targetDiv).off();
					events.empezarRecta = false;
					events.eventsDraw[events.select]();
				});
			}
		}
	}
	var objects = new Object;
	objects = {
		recta:{}
	}
	var colors = new Object;
	colors = {
		fill:function(){
			return $('#innerColor').val();
		},
		stroke:function(){
			return $('#borderColor').val();
		}
	}
	$(document).ready(function (){

		var html = '<div id="objeto"></div>';
		$(area.targetDiv).append($(html));

		//Seleccionar herramienta
		events.eventsMouse.drawSelect();
		events.eventsMouse.drawRect();
		
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