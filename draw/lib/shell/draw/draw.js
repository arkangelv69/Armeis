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
			$(area.targetDiv).children().children().children('path').click(function(event){
				//alert($(this)[0].raphaelid);
				if($(this)[0].raphaelid != objects.objectActual /*|| draw.select != 'select'*/)draw.objectSelect = false;
				if(draw.objectSelect){
					draw.objectSelect = false;
				}
				else{
					draw.objectSelect = true;
					objects.objectActual = $(this)[0].raphaelid;
				}
				control.propertys.drawPropertys();
			});
		},
		deselect:function(){
			draw.objectSelect = false;
			control.propertys.cleanPropertys();
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
					objects.librery.push({object:layer.path(path).attr({"fill":colorFill,"stroke":colorStroke,"stroke-width":3}),idObject:objects.number,idlayer:control.layerActual});
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
			});
		}
	}
};