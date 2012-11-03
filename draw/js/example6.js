﻿(function($){
    jQuery(document).ready(function($) {
        var paper = Raphael('workArea', 1000, 1000);
        var quesito = function(options){
            //Options
            var title = '';
            var desc = '';
            var porc = 0;
            var color = '';

            var caja = [];
            var angulo = [];
            var rot = [];
            rot.push(0);
            var supera180 = false;
            var primeraVez = true;
            var st = [];
            var radio = 200;
            var positionX = 400;
            var positionY = 220;
            var altura = 100;

            var i = 0;
            for(var property in options){
                if(options.hasOwnProperty(property)){

                    title = options[property].title;
                    desc = options[property].desc;
                    porc = options[property].porcentaje;
                    color = options[property].color;

                    paper.setStart();
                    angulo.push( (- 360 * porc / 100) );
                    

                    var arc1x = -(radio -radio*Math.cos(angulo[i]*Math.PI/180));
                    var arc1y = radio*Math.sin(angulo[i]*Math.PI/180);
                    //primer arco
                    var a1 = paper.path('M'+positionX+','+positionY+' h'+radio+' a'+radio+','+radio+' 0 0,0 '+arc1x+','+arc1y+' z')
                        .attr({fill: -rot[i]+'-#999-#fff:0-'+color,'stroke':'none'})
                    //-->
                    .animate({'transform':'r'+rot[i]+' '+positionX+','+positionY},1000);
                    var var1x = radio*Math.cos(rot[i]*Math.PI/180);
                    var var1y = radio*Math.sin(rot[i]*Math.PI/180);
                    var var2x = radio*Math.cos((angulo[i]+rot[i])*Math.PI/180);
                    var var2y = radio*Math.sin((angulo[i]+rot[i])*Math.PI/180);
                    //Rectas
                    var r1 = paper.path('M'+positionX+','+positionY+' v'+altura+' l'+var1x+','+var1y+' v-'+altura+' z')
                        .toBack()
                        .attr({fill: -rot[i]+'-#888-'+color,'stroke':'none'});
                    var r2 = paper.path('M'+positionX+','+positionY+' v'+altura+' l'+var2x+','+var2y+'v-'+altura+' z')
                        .attr({fill: -rot[i]+'-#888-'+color,'stroke':'none'});
                    //-->
                    if((rot[i]+angulo[i])>-90 || (rot[i]+angulo[i]) <= -270 )r2.toBack();
                    var width = r2.attr('width');
                    if((rot[i]+angulo[i])<=-180)supera180 = true;
                    var arc2x = positionX+radio*Math.cos(rot[i]*Math.PI/180);
                    var arc2y = positionY+radio*Math.sin(rot[i]*Math.PI/180);
                    var arc3x = positionX+radio*Math.cos((rot[i]+angulo[i])*Math.PI/180);
                    var arc3y = positionY+radio*Math.sin((rot[i]+angulo[i])*Math.PI/180)+altura;
                    //curva
                    if( supera180 && primeraVez ){
                        primeraVez = false;
                        p = paper.path('M'+(positionX-radio)+','+positionY+' v'+altura+' A'+radio+','+radio+' 0 0,0 '+arc3x+','+arc3y+' v-'+altura+' A'+radio+','+radio+' 0 0,1 '+(positionX-radio)+','+positionY)
                        .attr({fill: (-rot[i])+'-#999-'+color,'stroke':'none'});
                    }
                    else if( supera180 ){
                        p = paper.path('M'+arc2x+','+arc2y+' v'+altura+' A'+radio+','+radio+' 0 0,0 '+arc3x+','+arc3y+' v-'+altura+' A'+radio+','+radio+' 0 0,1 '+arc2x+','+arc2y)
                            .attr({fill: -rot[i]+'-#999-'+color,'stroke':'none'});
                    }else{
                        p = paper.path('M'+arc2x+','+arc2y+' v'+altura+' A'+radio+','+radio+' 0 0,0 '+arc3x+','+arc3y+' v-'+altura+' A'+radio+','+radio+' 0 0,1 '+arc2x+','+arc2y)
                            .attr({fill: -rot[i]+'-#999-'+color,'stroke':'none'})
                            .toBack();
                    }
                    //-->
                    //segundo arco
                    var a2 = paper.path('M'+positionX+','+(positionY+altura)+' h'+radio+' a'+radio+','+radio+' 0 0,0 '+arc1x+','+arc1y+' z').toBack()
                        .attr({fill: -rot[i]+'-#999-'+color,'stroke':'none'})
                        .animate({'transform':'r'+rot[i]+' '+positionX+','+(positionY+altura)},1000);
                    //-->
                    st.push(paper.setFinish());
                    st[i].data('index',i);
                    st[i].hover(
                        function(){
                            var index = this.data('index');
                            var anguloMove = rot[index]+(angulo[index]/2);
                            var increX = radio/10*Math.cos(anguloMove*Math.PI/180);
                            var increY = radio/10*Math.sin(anguloMove*Math.PI/180);
                            st[index].attr({stroke:'#0B3200'});
                            st[index][0].animate({'transform':'t'+increX+','+increY+' r'+rot[index]+' '+positionX+','+positionY},500);
                            st[index][1].animate({'transform':'t'+increX+','+increY},500);
                            st[index][2].animate({'transform':'t'+increX+','+increY},500);
                            st[index][3].animate({'transform':'t'+increX+','+increY},500);
                            st[index][4].animate({'transform':'t'+increX+','+increY+' r'+rot[index]+' '+positionX+','+(positionY+altura)},500);
                        },
                        function(){
                            var index = this.data('index');
                            st[index].attr({stroke:'none'});
                            st[index][0].animate({'transform':'t0,0 r'+rot[index]+' '+positionX+','+positionY},500);
                            st[index][1].animate({'transform':'t0,0'},500);
                            st[index][2].animate({'transform':'t0,0'},500);
                            st[index][3].animate({'transform':'t0,0'},500);
                            st[index][4].animate({'transform':'t0,0 r'+rot[index]+' '+positionX+','+(positionY+altura)},500);
                    });

                    rot.push(rot[i]+angulo[i]);
                    i++;
                }
            }
            i = 0;
            for(var property in options){
                if(options.hasOwnProperty(property)){
                    color = options[property].color;
                    //Caja de texto
                    var anguloMove = rot[i]+(angulo[i]/2);
                    var increX = positionX+radio/1.2*Math.cos(anguloMove*Math.PI/180);
                    var increY = positionY+radio/1.2*Math.sin(anguloMove*Math.PI/180);
                    caja.push(paper.rect(increX,increY,100,100,10));
                    caja[i].attr({fill:color,'stroke':'none','opacity':0})
                        .toFront();
                    st[i].hover(function(){
                            var index = this.data('index');
                            caja[index].animate({opacity:1},2000)
                        },function(){
                            var index = this.data('index');
                            caja[index].animate({opacity:0},2000)
                        });
                i++;
                }
            }
        };
        quesito({
            quesito1:{
                title:'PP',
                desc:'Partido Popular',
                porcentaje:20,
                color:'#fff333'
            },
            quesito2:{
                title:'PSOE',
                desc:'Partido Socialista obrero español',
                porcentaje:50,
                color:'#333'
            },
            quesito3:{
                title:'IU',
                desc:'Izquierda Unida',
                porcentaje:15,
                color:'#555fff'
            },
            quesito4:{
                title:'BILDU',
                desc:'Partido de los Vascos',
                porcentaje:15,
                color:'#f321ab'
            }
        });
    });
}(jQuery));