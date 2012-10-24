//objects
var objects = new Object;
objects = $.extend(shell, objects);
objects = {
	number:0,
	objectActual:0,
	objectSlideActul:{},
	librery:[],
	backup:{},
	temporal:{},
	select:{
		tempDraw:function(){
			var R = control.paper[control.layerActual].raphael;
			var r = objects.librery[objects.objectActual].object;
			var coord = r.getBBox();
			var weight = 5;
			for( var property in  objects.select.methods ){
				if(!objects.select.methods[property])continue;
				objects.select.attributes[property] = objects.select.methods[property](R,coord,weight);	
			}
		},
		tempClean:function(){
			for( var property in objects.select.attributes ){
				if(!objects.select.attributes[property])continue;
				objects.select.attributes[property].remove();	
			}
		},
		methods:{
			tempC :  function(R,coord,weight){return R.rect().attr(coord).attr(colors.styles.dots)},
			tempLT : function(R,coord,weight){return R.rect(coord.x-(weight/2),coord.y-(weight/2),weight,weight).attr(colors.styles.fill)},
			tempCT : function(R,coord,weight){return R.rect(coord.x+coord.width/2-(weight/2),coord.y-(weight/2),weight,weight).attr(colors.styles.fill)},
			tempRT : function(R,coord,weight){return R.rect(coord.x+coord.width-(weight/2),coord.y-(weight/2),weight,weight).attr(colors.styles.fill)},
			tempCR : function(R,coord,weight){return R.rect(coord.x+coord.width-(weight/2),coord.y+coord.height/2-(weight/2),weight,weight).attr(colors.styles.fill)},
			tempRB : function(R,coord,weight){return R.rect(coord.x+coord.width-(weight/2),coord.y+coord.height-(weight/2),weight,weight).attr(colors.styles.fill)},
			tempCB : function(R,coord,weight){return R.rect(coord.x+coord.width/2-(weight/2),coord.y+coord.height-(weight/2),weight,weight).attr(colors.styles.fill)},
			tempLB : function(R,coord,weight){return R.rect(coord.x-(weight/2),coord.y+coord.height-(weight/2),weight,weight).attr(colors.styles.fill)},
			tempCL : function(R,coord,weight){return R.rect(coord.x-(weight/2),coord.y+coord.height/2-(weight/2),weight,weight).attr(colors.styles.fill)}
		},
		attributes:{}
	}
};