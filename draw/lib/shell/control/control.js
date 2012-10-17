//control
var control = new Object;
control = $.extend(shell, control);
control = {
	numberBetweenLayers:500,
	numLayers:1,
	paper:[],
	layerActual:0,
	propertys:{
		list:{
			nameObject:'',
			height:0,
			width:0,
			fillColor:'',
			strokeColor:'',
			widthStrokeColor:0,
			positionRelativeLeft:0,
			positionRelativeTop:0,
			positionAbsoluteLeft:0,
			positionAbsoluteTop:0
		},
		getProperty:function(  property ){
			return control.get [ property ](); 
		},
		setProperty:function( ){
			var set = '';
			var get = '';
			for( property in control.propertys.list){
				if(control.propertys.list [ property ])continue;
				set = control.propertys.list [ property ];
				get = control.propertys.getProperty( property );
				set = get;	
			}
		},
		get:{
			nameObject: function(){

			},
			height: function(){
				
			},
			width: function(){
				
			},
			fillColor: function(){
				
			},
			strokeColor: function(){
				
			},
			widthStrokeColor: function(){
				
			},
			positionRelativeLeft: function(){
				
			},
			positionRelativeTop: function(){
				
			},
			positionAbsoluteLeft: function(){
				
			},
			positionAbsoluteTop: function(){
				
			}	
		}
	},
	eventsMouse:{
		controlAddLayer:function(){
			$('#addLayer').click(function(){
				var layers = $( "#itemLayers li" );
				var object = $( "#objeto" );
				var numero = layers.length + 1;
				var lista = '';
				var longObject = object.children().length;
				control.paper.push(Raphael('objeto',shell.sizeAreaWork('width'), shell.sizeAreaWork('height')));
				for(var i=0; i<longObject; i++){
					object.children().eq(longObject-(i+1)).data('layer',i+1);
				}
				lista = $('<li class="ui-state-default layer'+numero+' new"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>Capa '+numero+'</li>');
				$( "#itemLayers" ).append(lista);
				$( "#itemLayers li.new" ).data('layer',control.numLayers);
				control.layerActual = $( "#itemLayers li.new" ).data('layer')-1;
				layers.removeClass('new');
				control.numLayers++;
				layers.off();
				control.eventsMouse.controlOrderLayer();
				control.eventsMouse.controlSelectLayer();
			});	
		},
		controlOrderLayer:function(){
			$('#itemLayers li').mouseup(function(){
					var timer = setTimeout(function(){
					var objetos = $( "#objeto" ).children();
					var layers = $( this);
					var lengthObjetos = objetos.length;
					var lengthCapas = layers.length;
					var zIndex = control.numberBetweenLayers;

					for(var i=0; i<lengthCapas; i++){
						var dataCapa = layers.eq(i).data('layer');
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
				var objetos = $( "#objeto" ).children();
				var lengthObjetos = objetos.length;
				if($(this).hasClass( 'selected')){
					objetos.removeAttr('class');
					$(this).removeClass('selected');
				}
				else{
					control.layerActual = $(this).data('layer')-1;
					$('#itemLayers li').removeClass('selected');
					$(this).addClass( 'selected' );
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