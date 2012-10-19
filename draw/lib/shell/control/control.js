//control
var control = new Object;
control = $.extend(shell, control);
control = {
	numberBetweenLayers:500,
	numLayers:0,
	paper:[],
	layerActual:0,
	new:true,
	clickSelect:false,
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
				var layers = $( '#itemLayers' );
				var object = $( '#objeto' );
				var numero = layers.children('li').length + 1;
				var lista = '';
				var longObject = object.children().length;
				control.numLayers++;
				control.paper.push({raphael:Raphael('objeto',shell.sizeAreaWork('width'), shell.sizeAreaWork('height')),idLayers:control.numLayers});
				lista = $('<li class="ui-state-default layer'+numero+' new"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>Capa '+numero+'</li>');
				layers.append(lista);
				layers.children('li.new').data('layer',control.numLayers);
				layers.children('li').removeClass('new');
				control.layerActual = control.numLayers;
				control.paper[control.numLayers].raphael.canvas.id = control.numLayers;
				layers.children('li').off();
				control.new = true;
				control.eventsMouse.controlOrderLayer();
				control.eventsMouse.controlSelectLayer();
			});	
		},
		controlOrderLayer:function(){
			if(control.new){
				var timerControl = setTimeout(function(){
					var objetos = $( "#objeto" ).children();
					var layers = $('#itemLayers').children('li');
					var lengthObjetos = objetos.length;
					var lengthCapas = layers.length;
					var zIndex = control.numberBetweenLayers;

					for(var i=0; i<lengthCapas; i++){
						var dataCapa = layers.eq(i).data('layer');
						for(var e=0; e<lengthObjetos; e++){
							var dataObjeto = objetos[e].id;
							if(dataObjeto == dataCapa){
								objetos.eq(e).css('zIndex',zIndex*(lengthObjetos-i));
							}
						};
					};
					control.new = false;
				},200);
			}
			$('#itemLayers').children('li').mouseup(function(event){
				if(control.clickSelect){
					control.clickSelect = false;
				}else{
					var timerControl = setTimeout(function(){
						var objetos = $( "#objeto" ).children();
						var layers = $('#itemLayers').children();
						var lengthObjetos = objetos.length;
						var lengthCapas = layers.length;
						var zIndex = control.numberBetweenLayers;

						for(var i=0; i<lengthCapas; i++){
							var dataCapa = layers.eq(i).data('layer');
							for(var e=0; e<lengthObjetos; e++){
								var dataObjeto = objetos[e].id;
								if(dataObjeto == dataCapa){
									objetos.eq(e).css('zIndex',zIndex*(lengthObjetos-i));
								}
							};
						};
					},200);
				}
			});	
		},
		controlSelectLayer:function(){
			$('#itemLayers').children('li').click(function(){
				var objetos = $( "#objeto" ).children();
				var lengthObjetos = objetos.length;
				var zIndex = control.numberBetweenLayers;
				var dataCapa = $(this).data('layer');
				if($(this).hasClass( 'selected')){
					objetos.removeAttr('class');
					$(this).removeClass('selected');
				}
				else{
					$('#itemLayers').children('li').removeClass('selected');
					$(this).addClass( 'selected' );
					control.clickSelect = true;
					objetos.removeAttr('class');
					for(var e=0; e<lengthObjetos; e++){
						var dataObjeto = objetos[e].id;
						if(dataObjeto == dataCapa){
							control.layerActual = dataObjeto;
							objetos.eq(e).css('zIndex',zIndex*(lengthObjetos+1));
							objetos.eq(e).attr('class','selected');
						}
					};
				}	
			});
		}
	}
};