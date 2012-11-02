(function($){
    /*Raphael.el.cross = function () {
        this.attr({fill: "red"});
        this.paper.path("M10,10L50,50M50,10L10,50")
            .attr({stroke: "red"});
    }*/
    jQuery(document).ready(function($) {
        var paper = Raphael('workArea', 1000, 1000);
        var quesito = function(porc,color){
            var lengthPor = porc.length;
            var rot = 0;
            var supera180 = false;
            var primeraVez = true;
            var st = [];
            var radio = 200;
            var positionX = 400;
            var positionY = 200;
            var altura = 20;
            for( var i=0; i<lengthPor; i++){
                paper.setStart();
                var angulo = - 360 * porc[i] / 100;
                var arc1x = -(radio -radio*Math.cos(angulo*Math.PI/180));
                var arc1y = radio*Math.sin(angulo*Math.PI/180);
                var a1 = paper.path('M'+positionX+','+positionY+' h'+radio+' a'+radio+','+radio+' 0 0,0 '+arc1x+','+arc1y+' z').attr({'fill':'#fff'}).rotate(rot,positionX,positionY);
                    //.rotate(rot,positionX,100);
                var var1x = radio*Math.cos(rot*Math.PI/180);
                var var1y = radio*Math.sin(rot*Math.PI/180);
                //var var2x = radio*Math.cos(angulo*Math.PI/180);
                //var var2y = radio*Math.sin(angulo*Math.PI/180);
                var var2x = radio*Math.cos((angulo+rot)*Math.PI/180);
                var var2y = radio*Math.sin((angulo+rot)*Math.PI/180);
                var r1 = paper.path('M'+positionX+','+positionY+' v'+altura+' l'+var1x+','+var1y+' v-'+altura+' z').toBack().attr({'fill':'#fff'});
                var r2 = paper.path('M'+positionX+','+positionY+' v'+altura+' l'+var2x+','+var2y+'v-'+altura+' z').attr({'fill':'#fff'});
                if((rot+angulo)>-90 || (rot+angulo) <= -270 )r2.toBack();
                var width = r2.attr('width');
                if((rot+angulo)<=-180)supera180 = true;
                var arc2x = positionX+radio*Math.cos(rot*Math.PI/180);
                var arc2y = positionY+radio*Math.sin(rot*Math.PI/180);
                var arc3x = positionX+radio*Math.cos((rot+angulo)*Math.PI/180);
                var arc3y = positionY+radio*Math.sin((rot+angulo)*Math.PI/180)+altura;
                if( supera180 && primeraVez ){
                    primeraVez = false;
                    p = paper.path('M'+(positionX-radio)+','+positionY+' v'+altura+' A'+radio+','+radio+' 0 0,0 '+arc3x+','+arc3y+' v-'+altura+' A'+radio+','+radio+' 0 0,1 '+(positionX-radio)+','+positionY);
                }
                else if( supera180 ){
                    p = paper.path('M'+arc2x+','+arc2y+' v'+altura+' A'+radio+','+radio+' 0 0,0 '+arc3x+','+arc3y+' v-'+altura+' A'+radio+','+radio+' 0 0,1 '+arc2x+','+arc2y);
                }
                var a2 = paper.path('M'+positionX+','+(positionY+altura)+' h'+radio+' a'+radio+','+radio+' 0 0,0 '+arc1x+','+arc1y+' z').toBack().attr({'fill':'#fff'}).rotate(rot,positionX,(positionY+altura));
                st.push(paper.setFinish());
                st[i].attr({fill: color[i]});
                st[i].data('index',i);
                st[i].hover(function(){
                    var index = this.data('index');
                    st[index].attr({stroke:'#FFFF3A'});
                    st[index].transform('t0,-30')
                },function(){
                    var index = this.data('index');
                    st[index].attr({stroke:'#000'});
                });
                rot += angulo;
            }
        };
        quesito([20,15,15,30],['#fff','#333','#555fff','#f321ab','#32ab4f']);
        
        /*r.matrix.add(0.83,-0.58,0,1,51,174.5);
        var matrix = r.matrix.toTransformString();
        r.transform(matrix);*/
        //r.attr({width:width-2});
        //r.matrix.translate(10, 10)
        
        //paper.setViewBox(0, 0, 500, 500, true);*/
    });
}(jQuery));