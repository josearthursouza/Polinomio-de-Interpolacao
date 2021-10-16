
class Caixa {
  constructor(graficos) {
    this.graficos=graficos;
    this.contador=0; //numero de ptos
    this.ptos=[]; //ptos de pontos
    this.vecs=[]; //vetores pto_1 - pto_1

    this.largurão=this.graficos.clientWidth;

    this.plotX=[];
    for(var i =0; i<100;i++){
      this.plotX.push(i*(this.largurão/100));
    }
    //console.log(this.plotX);

    this.apagou=false;

    this.ponto=this.ponto.bind(this);
    //this.plota=this.plota.bind(this);

    this.donut=document.createElement('div');
    this.donut.id='donuuut';
    this.graficos.appendChild(this.donut);

    this.svg=d3.select('#donuuut').append('svg')
               .attr('height','100%')
               .attr('width','100%');

    this.svg.on('click', (e,d) => this.ponto(e));

    this.botão=this.svg.append('rect')
                    .attr('width','25px')
                    .attr('height','25px')
                    .attr('x', '5')
                    .attr('y','5')
                    .attr('fill', 'red')
                    .on('click', (e,d) => {this.apagou=true});
               
  }

  ponto(e){


    this.cir = this.svg.append('circle')
    .attr('cx', e.x -this.largurão/4 -3)
    .attr('cy', e.y -10)
    .attr('r','3px')
    .attr('fill','darkred');

    this.ptos.push([e.x -this.largurão/4 -3,e.y -10]);


    if(this.contador){ 
      const x1=this.ptos[this.contador -1][0];
      const x2=this.ptos[this.contador][0];
      const y1=this.ptos[this.contador -1][1];
      const y2=this.ptos[this.contador][1];

      const vetor= [x2-x1, y2-y1]
      const tamanho= ((vetor[0])**2 + (vetor[1])**2 )**(0.5);

      this.vecs.push([vetor[0]/tamanho , vetor[1]/tamanho]);

    }
    this.contador+=1;

    if(this.apagou){
      this.contador=0;
      this.ptos=[]; //ptos de pontos
      this.vecs=[];
      this.svg.selectAll("*").remove();
    
      this.botão=this.svg.append('rect')
                    .attr('width','25px')
                    .attr('height','25px')
                    .attr('x', '5')
                    .attr('y','5')
                    .attr('fill', 'red')
                    .on('click', (e,d) => {this.apagou=true});

      this.apagou=false;
    }


      this.plotY=[];
      for(let ptoX of this.plotX){
        var y=0;
        for(let pto of this.ptos){
          var t=1;
          for(let ptoo of this.ptos){
            if(ptoo!==pto){
              t=t*((ptoX-ptoo[0])/(pto[0]-ptoo[0]));
            }
          }
          t=t*pto[1];
          y+=t;
        }
        this.plotY.push(y);
      }

      this.svg.selectAll('line').remove();
      for(var i=0; i<99;i++){
        this.svg.append('line')
          .attr('x1', this.plotX[i] ).attr('y1', this.plotY[i]).attr('x2', this.plotX[i+1]).attr('y2', this.plotY[i+1])
          .attr('stroke','gray').attr('stroke-width','1px');
      }

    
    
  }
/*
  plota(){

    for(let ptoX of this.plotX){
      var y=0;
      for(let pto of this.ptos){
        var t=1;
        for(let ptoo of this.ptos){
          if(ptoo!==pto){
            t=1*((ptoX-pto[0])/(ptoo[0]-pto[0]));
          }
        }
        t=t*pto[1];
        y+=t;
      }
      this.plotY.push(y);
    }
    console.log(this.plotY);

  }*/
  
}