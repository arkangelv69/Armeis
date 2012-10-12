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
				eventActual = events.eventsDraw.rect;
				$(area.targetDiv).click(function(event){
					
					events.empezarRecta = true;
					if(events.inicialClick){	
						x1 = event.offsetX, y1 = event.offsetY;	
					}else{
						$("body").off("click", area.targetDiv, eventActual);
						events.empezarRecta = false;
						events.inicialClick = true;
					}
				});
				$(area.targetDiv).mousemove(function(event) {
					if(events.empezarRecta){
						var x2 = event.offsetX, y2 = event.offsetY;
						var color = colors.stroke();
						if(events.inicialClick){
							events.inicialClick = false;
							var area = Raphael('objeto',600, 600);
							objects.recta = area.path("M"+x1+","+y1+"L"+x2+","+y2).attr({"stroke":color,"stroke-width":3});
						}
						objects.recta.attr({
							"path":"M"+x1+","+y1+"L"+x2+","+y2,
							"stroke":color
						});
					}
				});
				$(area.targetDiv).dblclick( function () {
					$(area.targetDiv).off();
					events.empezarRecta = false;
					events.eventsDraw[events.select]();
				});
				$("body").on("click", area.targetDiv , eventActual);
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
			return $('innerColor').val();
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