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
			fill:'',
			stroke:'',
			'stroke-width':0,
			positionRelativeLeft:0,
			positionRelativeTop:0,
			positionAbsoluteLeft:0,
			positionAbsoluteTop:0,
			path:''
		},
		templatePropertys:{
			template:'\
				<h3>##TITLE##</h3>\
				<div>##PROPERTYS##</div>\
			',
			typeText:'<legend>##LEGEND##</legend><input type="text" name="##NAME##" id="##ID##" value="##VALUE##">'
		},
		drawPropertys:function(){
			if(draw.objectSelect){
				control.propertys.setPropertys();
				control.propertys.render();		
			}else{
				control.propertys.cleanPropertys();
			}
		},
		cleanPropertys:function(){
			$('#propertys input').each(function(index){
				 $(this).val('');
			})
		},
		getProperty:function(  property ){
			return control.propertys.get [ property ](); 
		},
		setPropertys:function( ){
			for( property in control.propertys.list){
				if(typeof(control.propertys.list [ property ]) == 'undefined')continue;
				control.propertys.list [ property ] = control.propertys.getProperty( property );
			}
		},
		get:{
			nameObject: function(){
				return objects.librery[objects.objectActual].object.attr("nameObject");
			},
			height: function(){
				return objects.librery[objects.objectActual].object.attr("height");
			},
			width: function(){
				return objects.librery[objects.objectActual].object.attr("width");
			},
			fill: function(){
				return objects.librery[objects.objectActual].object.attr("fill");
			},
			stroke: function(){
				return objects.librery[objects.objectActual].object.attr("stroke");
			},
			'stroke-width': function(){
				return objects.librery[objects.objectActual].object.attr("stroke-width");
			},
			positionRelativeLeft: function(){
				return objects.librery[objects.objectActual].object.attr("positionRelativeLeft");
			},
			positionRelativeTop: function(){
				return objects.librery[objects.objectActual].object.attr("positionRelativeTop");
			},
			positionAbsoluteLeft: function(){
				return objects.librery[objects.objectActual].object.attr("positionAbsoluteLeft");
			},
			positionAbsoluteTop: function(){
				return objects.librery[objects.objectActual].object.attr("positionAbsoluteTop");
			},
			path: function(){
				return objects.librery[objects.objectActual].object.attr("path");
			}
		},
		render:function(){
			var propertys = control.propertys.list;
			var htmlOutput = '';
			var htmlList = '';
			var type = control.propertys.templatePropertys.typeText;
			htmlOutput = control.propertys.templatePropertys.template;
			htmlOutput = htmlList.replace( '##TITLE##', shell.tras('Propiedades') );
			for( property in propertys ){
				if(typeof(control.propertys.list[property]) == 'undefined')continue;
				htmlList += type;
				htmlList = htmlList.replace( '##LEGEND##', property );
				htmlList = htmlList.replace( '##NAME##', property );
				htmlList = htmlList.replace( '##ID##', property );
				htmlList = htmlList.replace( '##VALUE##', control.propertys.list[property] );
			}
			htmlOutput += htmlList;
			$("#propertys").html(htmlOutput);
			$("#propertys input").off();
			control.eventsMouse.controlSetPropertysObjects();
		}
	},
	eventsMouse:{
		controlSetPropertysObjects:function(){
			$('#propertys input').change(function(){
				var attrObject =  $(this).val();
				var idAttrObject = $(this).attr('id');
				if(control.propertys.list[idAttrObject]){
					objects.librery[objects.objectActual].object.attr(idAttrObject,attrObject);
				}
			});
		},
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