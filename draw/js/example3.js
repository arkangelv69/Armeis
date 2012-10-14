//Ejemplos raphael
var funcionInicio = function ($){
	var area = new Object;
	area = {
		targetDiv:'#workArea'
	};
	var layers = new Object;
	layers = {
		numLayers:1,
		paper:[],
		layerActual:0
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
			controlAddLayer:function(){
				$('#addLayer').click(function(){
					var numero = $( "#itemLayers li" ).length + 1;
					layers.paper.push(Raphael('objeto',800, 430));
					longObject = $( "#objeto" ).children().length;
					for(var i=0; i<longObject; i++){
						$( "#objeto" ).children().eq(longObject-(i+1)).data('layer',i+1);
					}
					lista = $('<li class="ui-state-default layer'+numero+' new"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>Capa '+numero+'</li>');
					$( "#itemLayers" ).append(lista);
					$( "#itemLayers li.new" ).data('layer',layers.numLayers);
					layers.layerActual = $( "#itemLayers li.new" ).data('layer')-1;
					$( "#itemLayers li" ).removeClass('new');
					layers.numLayers++;
					events.eventsMouse.controlOrderLayer();
					events.eventsMouse.controlSelectLayer();
				});	
			},
			controlOrderLayer:function(){
				$('#itemLayers li').mouseup(function(){
						var timer = setTimeout(function(){
							var objetos = $( "#objeto" ).children();
							var capas = $( "#itemLayers li" );
							var lengthObjetos = objetos.length;
							var lengthCapas = capas.length;
							var height = 500;

							for(var i=0; i<lengthCapas; i++){
								var dataCapa = $( "#itemLayers li").eq(i).data('layer');
								for(var e=0; e<lengthCapas; e++){
									var dataObjeto = objetos.eq(e).data('layer');
									if(dataObjeto == dataCapa){
										objetos.eq(e).css('zIndex',500*(lengthObjetos-i));
									}
								};
							};
						}, 200);
				});	
			},
			controlSelectLayer:function(){
				$('#itemLayers li').click(function(){
					layers.layerActual = $(this).data('layer')-1;
					$('#itemLayers li').removeClass('selected');
					$(this).addClass( 'selected' );
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
						var area = layers.paper[layers.layerActual];
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
		layers.paper.push(Raphael('objeto',800, 430));
		$( "#objeto" ).children().first().data('layer',layers.numLayers);
		$( "#itemLayers" ).sortable();
        $( "#itemLayers" ).disableSelection();
        $( "#itemLayers li" ).first().data('layer',layers.numLayers);
        layers.numLayers++;

		//Seleccionar herramienta
		events.eventsMouse.drawSelect();
		events.eventsMouse.drawRect();
		events.eventsMouse.drawClean();

		//Eventos de control
		events.eventsMouse.controlAddLayer();
		events.eventsMouse.controlOrderLayer();
		events.eventsMouse.controlSelectLayer();
		
		//Usar herramienta línea
		events.eventsDraw[events.select];

	});
}(jQuery);