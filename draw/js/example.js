//Ejemplos raphael
var funcionInicio = function ($){
	var layers = [];
	var objects = [];
	var group = [];
	var set = [];
	var draw = new Object;
	draw = {
			titulos:6,
			dobleColumna: true,
			colorFondo:{
				"fill":"#0088FF",
				"stroke-width":0,
				"cursor":"default"
			},
			colorFondoResaltado:{
				"fill":"#07A2FF",
				"cursor":"pointer"
			},
			colorFondoAcabado:{
				"fill":"#0088FF",
				"stroke-width":0,
				"opacity":.6
			},
			colorSombraFondo:{
				"fill":"45-#333-#000",
				"opacity":.2,
				"stroke-width":0,
				"stroke":"none"
			},
			colorSombraSuperior:{
				"fill":"90-#0088FF-#fff",
				"opacity":.5,
				"stroke-width":0
			},
			colorCirculo:{
				"fill":"#fff",
				"stroke-width":0
			},
			template:{
				objeto:'<div id="##move##" class="move">\
							<h3>##numero##</h3>\
							<h2>##titulo##</h2>\
						</div>',
			},
			event:{
				hover:function(){
					$('.move').hover(
						function(){
							var id =$(this).children()[0].id;
							objects[id][1].attr(draw.colorFondoResaltado);
						},function(){
							var id =$(this).children('svg, div')[0].id;
							objects[id][1].attr(draw.colorFondo);
						});
				},
				end:function(){

				}
			}
		};

	$(document).ready(function (){
		var numeroListas = draw.titulos;
		var x = -1000;
		var y = 8; 
		var incrementX = 1000;	
		var incrementY = 50;
		var alto = 40;
		var borde = 4;
		var incrementCircleX = alto + 2;	
		var incrementCircleY = alto/2 + 2;
		
		for(var i=0; i< numeroListas; i++){
			var html = draw.template.objeto;
			html = html.replace('##move##','move'+i);
			if(!i)html = html.replace('<h3>##numero##</h3>','');
			else html = html.replace('##numero##',i);
			html = html.replace('##titulo##','Título'+i);
			
			$('#workArea').append($(html));
			$('#move'+i).css({
				"position":"absolute",
				"left": x,
				"top": y
			});
			x -= incrementX;
			y += incrementY;	
		}
		if(draw.dobleColumna){
			var x = -1000;
			var y = 12;
			
			for(var i=numeroListas; i< numeroListas+numeroListas; i++){
				var html = draw.template.objeto;
				html = html.replace('##move##','move'+i);
				html = html.replace('##numero##',i);
				html = html.replace('##titulo##','Título'+i);
				
				$('#workArea').append($(html));
				$('#move'+i).css({
					"position":"absolute",
					"left": x-1000,
					"top": y
				});
				x -= incrementX;
				y += incrementY;	
			}		
		}
		for(var i=0; i< numeroListas; i++){
			layers.push(Raphael("move"+i,390, 60));
			layers[i].canvas.id = i;
			objects[i] = new Array;
			//Sombra de atras
			objects[i].push(layers[i].path("M50,5h300 a50,30 0 0,1 0,40 h-300 a50,30 0 0,1 0,-40").attr(draw.colorSombraFondo).glow({width:8,offsetx:1,offsety:1,opacity:.2,fill:true}));						
			//Color de fondo
			objects[i].push(layers[i].path("M50,5h300 a50,30 0 0,1 0,40 h-300 a50,30 0 0,1 0,-40").attr(draw.colorFondo));
			//Iluminacion superior
			objects[i].push(layers[i].path("M50,9h300 a100,20 0 0,1 0,15 h-300 a100,20 0 0,1 0,-15").toFront().attr(draw.colorSombraSuperior));
			//Circle
			if(i)objects[i].push(layers[i].circle(60,25,15).attr(draw.colorCirculo));
			else objects[i].push(layers[i].circle(60,25,15).attr({opacity:0,stroke:'none'}));
			set[i] = layers[i].set();
			set[i].push(
					objects[i][1],
					objects[i][2],
					objects[i][3]
				);
			if(i==0){
				set[i].attr({opacity: .5});
			}
			/*group[i] = layers[i].group(i,objects[i]);
			group[i].id = i;*/
			$("#move"+i).animate({
					"left":10
				},2000
			);
		}
		if(draw.dobleColumna){
			for(var i=numeroListas; i<numeroListas+numeroListas; i++){
				layers.push(Raphael("move"+i,390, 60));
				layers[i].canvas.id = i;
				objects[i] = new Array;
				//Sombra de atras
				objects[i].push(layers[i].path("M50,5h300 a50,30 0 0,1 0,40 h-300 a50,30 0 0,1 0,-40").attr(draw.colorSombraFondo).glow({width:8,offsetx:1,offsety:1,opacity:.2,fill:true}));						
				//Color de fondo
				objects[i].push(layers[i].path("M50,5h300 a50,30 0 0,1 0,40 h-300 a50,30 0 0,1 0,-40").attr(draw.colorFondo));
				//Iluminacion superior
				objects[i].push(layers[i].path("M50,9h300 a100,20 0 0,1 0,15 h-300 a100,20 0 0,1 0,-15").toFront().attr(draw.colorSombraSuperior));
				//Circle
				objects[i].push(layers[i].circle(60,25,15).attr(draw.colorCirculo));
				set[i] = layers[i].set();
				set[i].push(
						objects[i][1],
						objects[i][2],
						objects[i][3]
					);
				if(i==11){
					set[i].attr({opacity: .5});
				}
				$("#move"+i).animate({
						"left":400
					},2000
				);
			}
		}
		draw.event.hover();
	});
}(jQuery);