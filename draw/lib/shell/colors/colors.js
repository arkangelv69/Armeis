//colors
var colors = new Object;
colors = $.extend(shell, colors);
colors = {
	fill:function(){
		return $('#innerColor').val();
	},
	stroke:function(){
		return $('#borderColor').val();
	},
	styles: {
        line : {
            stroke: "#000",
            "stroke-width": 2,
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
        },
        dots :{
            stroke: "#fff",
            "stroke-width": 2,
            "stroke-dasharray": "- ",
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
        },
        fill :{
            stroke: "#fff",
            fill: "#fff",
            "fill-opacity": .5,
            "stroke-width": 2,
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
             
        },
        selected:{
        	cursor: "move"
        },
        none :{
            fill: "#000",
            opacity: 0
        }
	}
};