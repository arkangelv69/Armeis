//draw
var draw = new Object;
draw = $.extend(shell, draw);
draw = {
	select:'select',
	inicialClick:true,
	empezarRect:false,
	objectSelect:false,
	eventsMouse:{
		drawSelect: function(){
			$('#select').click(function(){
				draw.select = 'select';
				$(area.targetDiv).off();
				$(area.targetDiv+' path').off();
				draw.eventsDraw[draw.select]();
				draw.eventsDraw['deselect']();
			});
		},
		drawRect:function(){
			$('#rect').click(function(){
				draw.select = 'rect';
				$(area.targetDiv).off();
				$(area.targetDiv+' path').off();
				draw.eventsDraw[draw.select]();
				draw.eventsDraw['deselect']();
			});	
		},
		drawClean:function(){
			$('#clean').click(function(){
				draw.select = 'clean';
				$(area.targetDiv).off();
				draw.eventsDraw[draw.select]();
				draw.eventsDraw['deselect']();
			});	
		}
	},
	eventsDraw:{
		select:function(){
			$(area.targetDiv).not('path').click(function(event){
				if(draw.objectSelect){
					draw.objectSelect = false;
					var r = objects.librery[objects.objectActual].object;
					r.node.class= "";
					r.attr("cursor","default");
					r.undrag();
				}
			});
			$(area.targetDiv).children().children().children('path').click(function(event){
				var R = control.paper[control.layerActual].raphael;
				var r = objects.librery[objects.objectActual].object;
				objects.select.tempClean();
				r.attr("cursor","default");
				r.undrag();
				if(!draw.objectSelect || $(this)[0].id != objects.objectActual || $(this)[0].id == objects.objectActual){
					objects.objectActual = $(this)[0].id;
					draw.objectSelect = true;
					objects.select.tempDraw();
					var R = control.paper[control.layerActual].raphael;
					var r = objects.librery[objects.objectActual].object;
					r.node.class= "selected";
					r.attr(colors.styles.selected);
					r.drag(shell.drag.move, shell.drag.start, shell.drag.up);
				}
				control.propertys.drawPropertys();
			});
		},
		deselect:function(){
			draw.objectSelect = false;
			control.propertys.cleanPropertys();
			if(objects.select.attributes)objects.select.tempClean();
		},
		rect:function(){
			$(area.targetDiv).click(function(event){
				draw.empezarRect = true;
				if(draw.inicialClick){	
					var x1 = shell.positionRelative(event,'x');
					var y1 = shell.positionRelative(event,'y');
					var path = "M"+x1+","+y1;
					var layer = control.paper[control.layerActual].raphael;
					var colorStroke = colors.stroke();
					var colorFill = colors.fill();
					objects.librery.push({object:layer.path(path).attr({"stroke-linecap": "round","stroke-linejoin": "round","fill":colorFill,"stroke":colorStroke,"stroke-width":3}),idObject:objects.number,idlayer:control.layerActual});
					objects.librery[objects.number].object.node.id = objects.number;
					objects.librery[objects.number].object.class= "";
					objects.objectActual = 	objects.number;
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
						if(objects.librery[objects.objectActual].object.attr("path"))path = objects.librery[objects.objectActual].object.attr("path");					
						draw.inicialClick = false;
						path = path + "L"+x2+","+y2;
					}else{
						var object = objects.librery[objects.objectActual].object.attrs.path;
						var size = object.length;
						for(var i= 0; i < size; i++){
							if( i == size-1 && size > 1 ){
								path += "L"+x2+","+y2;
							}else {
								path += object[i][0]+object[i][1]+','+object[i][2];
							}
						}

					}
					objects.librery[objects.objectActual].object.attr({
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
				if(objects.librery[objects.objectActual].object.attr("path"))path = objects.librery[objects.objectActual].object.attr("path");
				objects.librery[objects.objectActual].object.attr({
						"path":path+"z",
						"stroke":colorStroke,
						"fill":colorFill
					});
				objects.number++;
				$(area.targetDiv).off();
				draw.empezarRect = false;
				draw.eventsDraw[draw.select]();
			});
		},
		clean:function(){
			$(area.targetDiv+' path').click(function(event){
				$(this).remove();
				if(objects.librery.temp)objects.librery.temp.remove();
			});
		}
	}
};