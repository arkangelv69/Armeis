//colors
var colors = new Object;
colors = $.extend(shell, colors);
colors = {
	fill:function(){
		return $('#innerColor').val();
	},
	stroke:function(){
		return $('#borderColor').val();
	}
};