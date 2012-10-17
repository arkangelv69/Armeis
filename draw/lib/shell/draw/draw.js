//draw
var draw = new Object;
draw = $.extend(shell, draw);
draw = {
	select:'select',
	inicialClick:true,
	empezarRect:false,
	eventsMouse:{
		drawSelect: function(){
			$('#select').click(function(){
				draw.select = 'select';
				$(area.targetDiv).off();
				$(area.targetDiv+' path').off();
				draw.eventsDraw[draw.select]();
			});
		},
		drawRect:function(){
			$('#rect').click(function(){
				draw.select = 'rect';
				$(area.targetDiv).off();
				$(area.targetDiv+' path').off();
				draw.eventsDraw[draw.select]();
			});	
		},
		drawClean:function(){
			$('#clean').click(function(){
				draw.select = 'clean';
				$(area.targetDiv).off();
				draw.eventsDraw[draw.select]();
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
				draw.empezarRect = true;
				if(draw.inicialClick){	
					var x1 = shell.positionRelative(event,'x');
					var y1 = shell.positionRelative(event,'y');
					var path = "M"+x1+","+y1;
					var area = control.paper[control.layerActual];
					var colorStroke = colors.stroke();
					var colorFill = colors.fill();
					objects.recta = area.path(path).attr({"fill":colorFill,"stroke":colorStroke,"stroke-width":3});	
				}else{
					draw.inicialClick = true;
				}
			});
			$(area.targetDiv).mousemove(function(event) {
				if(draw.empezarRect){
					var x2 = shell.positionRelative(event,'x');
					var y2 = shell.positionRelative(event,'y');
					var path ="";
					if( draw.inicialClick ){
						if(objects.recta.attr("path"))path = objects.recta.attr("path");					
						draw.inicialClick = false;
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
				var x2 = shell.positionRelative(event,'x'); 
				var y2 = shell.positionRelative(event,'y');
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
				draw.empezarRect = false;
				draw.eventsDraw[draw.select]();
			});
		},
		clean:function(){
			$(area.targetDiv+' path').click(function(event){
				$(this).remove();
			});
		}
	}
};