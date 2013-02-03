(function($){
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
            var rot = [0];
            var supera180 = false;
            var primeraVez = true;
            var st = [];
            var radio = 100;
            var X = 400;
            var Y = 220;
            var height = 20;
            var r1 = [],r2 = [] ,width, heighNivel, diff,positionY=[];
            var niveles = false;
            var max = 0;

            if(niveles){
                for(var property in options){
                    if(options.hasOwnProperty(property)){
                            porc = options[property].porcentaje;
                            altura = height * porc /100;
                            max = Math.max(max,altura);
                    }
                }
            }

            var i = 0;
            for(var property in options){
                if(options.hasOwnProperty(property)){

                    title = options[property].title;
                    desc = options[property].desc;
                    porc = options[property].porcentaje;
                    color = options[property].color;

                    paper.setStart();
                    angulo.push( (- 360 * porc / 100) );

                    if(niveles){
                        altura = height * porc /100;
                        diff = max - altura;
                        positionY.push(Y + diff);
                    }else{
                        altura = height;
                        positionY.push(Y);
                    }

                    var arc1x = -(radio -radio*Math.cos(angulo[i]*Math.PI/180));
                    var arc1y = radio*Math.sin(angulo[i]*Math.PI/180);
                    //primer arco
                    var laflag = 0;
                    if(angulo[i]<-180){
                        laflag = 1;
                    }
                    if(angulo[i]<=-360){
                        var c1 = paper.circle(X,positionY[i],radio)
                        .attr({fill: -rot[i]+'-#999-#fff:0-'+color,'stroke':'none'});
                    }else{
                        var a1 = paper.path('M'+X+','+positionY[i]+' h'+radio+' a'+radio+','+radio+' 0 '+laflag+',0 '+arc1x+','+arc1y+' z')
                            .attr({fill: color,'stroke':'none',opacity:1}).transform('t0,0 r'+rot[i]+' '+X+','+positionY[i]);
                    }
                    //-->
                    var var1x = radio*Math.cos(rot[i]*Math.PI/180);
                    var var1y = radio*Math.sin(rot[i]*Math.PI/180);
                    var var2x = radio*Math.cos((angulo[i]+rot[i])*Math.PI/180);
                    var var2y = radio*Math.sin((angulo[i]+rot[i])*Math.PI/180);
                    //-->
                    //Rectas
                    r1.push(paper.path('M'+X+','+positionY[i]+' v'+altura+' l'+var1x+','+var1y+' v-'+altura+' z')
                        .attr({fill: -rot[i]+'-#fff-'+color,'stroke':'none'}));
                    r2.push(paper.path('M'+X+','+positionY[i]+' v'+altura+' l'+var2x+','+var2y+'v-'+altura+' z')
                        .attr({fill: -rot[i]+'#fff-'+color,'stroke':'none'}));
                    if((rot[i]+angulo[i])>-90 || (rot[i]+angulo[i]) <= -270 ){
                        r2[i].toBack();
                    }
                    else if((rot[i]+angulo[i])<=-180){
                        supera180 = true;
                    }
                    r2[i].attr('width');

                    var arc2x = X+radio*Math.cos(rot[i]*Math.PI/180);
                    var arc2y = positionY[i]+radio*Math.sin(rot[i]*Math.PI/180);
                    var arc3x = X+radio*Math.cos((rot[i]+angulo[i])*Math.PI/180);
                    var arc3y = positionY[i]+radio*Math.sin((rot[i]+angulo[i])*Math.PI/180)+altura;
                    //curva
                    if( supera180 && primeraVez ){
                        primeraVez = false;
                        p = paper.path('M'+(X-radio)+','+positionY[i]+' v'+altura+' A'+radio+','+radio+' 0 0,0 '+arc3x+','+arc3y+' v-'+altura+' A'+radio+','+radio+' 0 0,1 '+(X-radio)+','+positionY[i])
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
                    /*var a2 = paper.path('M'+X+','+(positionY[i]+altura)+' h'+radio+' a'+radio+','+radio+' 0 '+laflag+',0 '+arc1x+','+arc1y+' z').toBack()
                        .attr({fill: -rot[i]+'-#999-'+color,'stroke':'none',opacity:0}).transform('r'+rot[i]+' '+X+','+(positionY[i]+altura))
                        .animate({opacity:1},2000);*/
                    //-->
                    st.push(paper.setFinish());
                    st[i].data('index',i);
                    st[i].attr({opacity:0}).animate({opacity:1},500);
                    st[i].hover(
                        function(){
                            var index = this.data('index');
                            var anguloMove = rot[index]+(angulo[index]/2);
                            var increX = radio*2/10*Math.cos(anguloMove*Math.PI/180);
                            var increY = radio*2/10*Math.sin(anguloMove*Math.PI/180);
                            st[index].attr({stroke:'#0B3200','cursor':'pointer'});
                            st[index][0].animate({'transform':'t'+increX+','+increY+' r'+rot[index]+' '+X+','+positionY[index]},500,'bounce');
                            st[index][1].animate({'transform':'t'+increX+','+increY},500,'bounce');
                            st[index][2].animate({'transform':'t'+increX+','+increY},500,'bounce');
                            st[index][3].animate({'transform':'t'+increX+','+increY},500,'bounce');
                            //st[index][4].animate({'transform':'t'+increX+','+increY+' r'+rot[index]+' '+X+','+(positionY[i]+altura)},500);
                        },
                        function(){
                            var index = this.data('index');
                            st[index].attr({stroke:'none','cursor':'default'});
                            st[index][0].animate({'transform':'t0,0 r'+rot[index]+' '+X+','+positionY[index]},500,'bounce');
                            st[index][1].animate({'transform':'t0,0'},500,'bounce');
                            st[index][2].animate({'transform':'t0,0'},500,'bounce');
                            st[index][3].animate({'transform':'t0,0'},500,'bounce');
                            //st[index][4].animate({'transform':'t0,0 r'+rot[index]+' '+X+','+(positionY[i]+altura)},500);
                    });
    
                    if(rot[i] < 0 && rot[i] > -180){
                        if(st[i-1])st[i][1].insertBefore(st[i-1][1]);
                    }else if( rot[i] < -270 && rot[i] > -360 ){
                        st[i][1].insertBefore(st[i-1][1]);
                    }else if(rot[i] < -180 && rot[i] > -270){
                        st[i][1].insertBefore(st[i][0]);
                    }

                    rot.push(rot[i]+angulo[i]);
                    i++;
                }
            }
            for(var index in st){
                if(st[index]){
                    if(rot[index] < -90 && rot[index] > -270){
                        st[index][3].toFront();
                    }
                    st[index][0].toFront();
                }
            }
            i = 0;
            for(var property in options ){
                if(options.hasOwnProperty(property)){
                    color = options[property].color;
                    //Caja de texto
                    var anguloMove = rot[i]+(angulo[i]/2);
                    var incrementX = radio*2/1.2*Math.cos(anguloMove*Math.PI/180);
                    var incrementY = radio*2/1.2*Math.sin(anguloMove*Math.PI/180);
                    var increX = X+incrementX;
                    var increY = positionY[i]+incrementY;
                    var rect = radio/2;
                    caja.push(paper.rect(increX,increY,rect,rect,10));
                    caja[i].attr({fill:color,'stroke':'#000','opacity':0,transform:'t-'+rect/2+',-'+rect/2})
                        .toFront()
                        .data('index',i);
                    caja[i].hover(function(){
                            var index = this.data('index');
                            caja[index].animate({opacity:1},1000);

                            var anguloMove = rot[index]+(angulo[index]/2);
                            var increX = radio/10*Math.cos(anguloMove*Math.PI/180);
                            var increY = radio/10*Math.sin(anguloMove*Math.PI/180);
                            st[index].attr({stroke:'#0B3200','cursor':'pointer'});
                            st[index][0].animate({'transform':'t'+increX+','+increY+' r'+rot[index]+' '+X+','+positionY[index]},500,'bounce');
                            st[index][1].animate({'transform':'t'+increX+','+increY},500,'bounce');
                            st[index][2].animate({'transform':'t'+increX+','+increY},500,'bounce');
                            st[index][3].animate({'transform':'t'+increX+','+increY},500,'bounce');
                            //st[index][4].animate({'transform':'t'+increX+','+increY+' r'+rot[index]+' '+X+','+(positionY[i]+altura)},500);
                        },function(){
                            var index = this.data('index');
                            caja[index].animate({opacity:0},1000);

                            st[index].attr({stroke:'none','cursor':'default'});
                            st[index][0].animate({'transform':'t0,0 r'+rot[index]+' '+X+','+positionY[index]},500,'bounce');
                            st[index][1].animate({'transform':'t0,0'},500,'bounce');
                            st[index][2].animate({'transform':'t0,0'},500,'bounce');
                            st[index][3].animate({'transform':'t0,0'},500,'bounce');
                            //st[index][4].animate({'transform':'t0,0 r'+rot[index]+' '+X+','+(positionY[i]+altura)},500);
                        });    
                    st[i].hover(function(){
                            var index = this.data('index');
                            caja[index].animate({opacity:1},1000);
                        },function(){
                            var index = this.data('index');
                            caja[index].animate({opacity:0},1000);
                        });
                i++;
                }
            }
        };
        quesito({
            quesito1:{
                title:'PP',
                desc:'Partido Popular',
                porcentaje:10,
                color:'#fff333'
            },
            quesito2:{
                title:'PSOE',
                desc:'Partido Socialista obrero español',
                porcentaje:22,
                color:'#333'
            },
            quesito3:{
                title:'IU',
                desc:'Izquierda Unida',
                porcentaje:15,
                color:'#555fff'
            },
            quesito4:{
                title:'UPyD',
                desc:'Unión Partido y Democracia',
                porcentaje:5,
                color:'#533f22'
            },
            quesito5:{
                title:'BILDU',
                desc:'Partido de los Vascos',
                porcentaje:20,
                color:'#f321ab'
            },
            quesito6:{
                title:'BILDU',
                desc:'Partido de los Vascos',
                porcentaje:15,
                color:'#4c2fbf'
            },
            quesito7:{
                title:'BILDU',
                desc:'Partido de los Vascos',
                porcentaje:13,
                color:'#4cbf2f'
            }
        });
    });
}(jQuery));