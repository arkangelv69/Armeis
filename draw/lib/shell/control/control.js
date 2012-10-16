//control
var control = new Object;
control = $.extend(shell, control);
control = {
	numberBetweenLayers:500,
	numLayers:1,
	paper:[],
	layerActual:0,
	eventsMouse:{
		controlAddLayer:function(){
			$('#addLayer').click(function(){
				var numero = $( "#itemLayers li" ).length + 1;
				control.paper.push(Raphael('objeto',sell.sizeAreaWork('width'), sell.sizeAreaWork('height')));
				longObject = $( "#objeto" ).children().length;
				for(var i=0; i<longObject; i++){
					$( "#objeto" ).children().eq(longObject-(i+1)).data('layer',i+1);
				}
				lista = $('<li class="ui-state-default layer'+numero+' new"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>Capa '+numero+'</li>');
				$( "#itemLayers" ).append(lista);
				$( "#itemLayers li.new" ).data('layer',control.numLayers);
				control.layerActual = $( "#itemLayers li.new" ).data('layer')-1;
				$( "#itemLayers li" ).removeClass('new');
				control.numLayers++;
				$('#itemLayers li').off();
				control.eventsMouse.controlOrderLayer();
				control.eventsMouse.controlSelectLayer();
			});	
		},
		controlOrderLayer:function(){
			$('#itemLayers li').mouseup(function(){
					var timer = setTimeout(function(){
						var objetos = $( "#objeto" ).children();
						var capas = $( "#itemLayers li" );
						var lengthObjetos = objetos.length;
						var lengthCapas = capas.length;
						var zIndex = numberBetweenLayers;

						for(var i=0; i<lengthCapas; i++){
							var dataCapa = $( "#itemLayers li").eq(i).data('layer');
							for(var e=0; e<lengthCapas; e++){
								var dataObjeto = objetos.eq(e).data('layer');
								if(dataObjeto == dataCapa){
									objetos.eq(e).css('zIndex',zIndex*(lengthObjetos-i));
								}
							};
						};
					}, 200);
			});	
		},
		controlSelectLayer:function(){
			$('#itemLayers li').click(function(){
				if($(this).hasClass( 'selected')){
					var objetos = $( "#objeto" ).children();
					objetos.removeAttr('class');
					$(this).removeClass('selected');
				}
				else{
					control.layerActual = $(this).data('layer')-1;
					$('#itemLayers li').removeClass('selected');
					$(this).addClass( 'selected' );

					var objetos = $( "#objeto" ).children();
					var lengthObjetos = objetos.length;
					var dataCapa = $(this).data('layer');
					objetos.removeAttr('class');
					for(var e=0; e<lengthObjetos; e++){
						var dataObjeto = objetos.eq(e).data('layer');
						if(dataObjeto == dataCapa){
							objetos.eq(e).attr('class','selected');
						}
					};
				}
			});
		}
	}
};