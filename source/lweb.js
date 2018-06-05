//
//pixi part
//
let type = "WebGL";
if(!PIXI.utils.isWebGLSupported()){
    type = "canvas";
}
PIXI.utils.sayHello(type);

let app = new PIXI.Application({antialias:true, width:2000, height:2000, backgroundColor:0xffffff, sharedTicker:true});
document.body.appendChild(app.view);
var canvas = app.view;
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
//app.renderer.autoResize = true;
//app.renderer.resize(window.innerWidth, window.innerHeight);

//var canvas = document.getElementById("cnv");
var context = canvas.getContext("2d"),
        width = canvas.width,
        height = canvas.height;
//var FPS = 60;
//var renderObj = app.renderer.currentRenderer;
/*
function ticked(){
    let base = new PIXI.BaseTexture.fromCanvas(canvas);
    let sprite = new PIXI.Sprite(base);
    app.stage.appendChild(sprite);
}
function dragsubject(){

}
function dragstarted(){

}
function dragged(){

}
function dragended(){

}
*/


//
///D3 part
//
//
var dataset;

d3.json("http://localhost:8000/geneData.json").then(function(data){
    //console.log(data);
    dataset = data;
    anim();
})

function gameLoop(delta){
    var i = 0;
    
    dataset.links.forEach(function(d){
        var line = app.stage.getChildAt(i);
        line = line.clear();
        //line.nativeLines = true;
        line.lineStyle(1,0xffb6c1,1);
        //if(i==507){
        //    line.lineStyle(5,0x32dc32,1);
         //   line.moveTo(d.source.x+width/2, d.source.y+height/2);
         //   line.lineTo(d.target.x+width/2, d.target.y+height/2);
         //  console.log("ratio:"+d.target.x/line.position.x+","+d.target.y/line.position.y);
          //  line.setTransform(d.source.x+width/2,d.source.y+height/2,d.target.x/line.position.x,d.target.y/line.position.y);
            
       // }
      //  else{
            
        //    line.position.x = d.source.x+width/2;
        //    line.position.y = d.source.y+height/2;
         //   line.moveTo(0, 0);
         //   line.lineTo(d.target.x+width/2, d.target.y+height/2);
            line.moveTo(d.source.x+width/2, d.source.y+height/2);
        line.lineTo(d.target.x+width/2, d.target.y+height/2);
       // }
        i++;
    });
    
    dataset.nodes.forEach(function(d){
        //console.log(d);
        var circle = app.stage.getChildAt(i);
        //if(i== 8572){
        //    console.log(circle);
        //    console.log(d);

        //    circle.x = d.x+width/2-circle.parent.width;
        //    circle.y = d.y+height/2-circle.parent.height;
            circle.position.x = d.x+width/2+1;
            circle.position.y = d.y+height/2+1;
      //  }
        //目前来看应该与父元素位置有关，但是每次这样做相关运算就会来回跳，而且现在搞不清楚究竟是不是线性关系，非常麻烦
        //circle.setTransform(d.x-cx,d.y-cy);
        
        
        i++;
    });

    console.log(app.ticker.FPS);

}
function anim(){
    //console.log(dataset);
    
    
   // console.log("init");
    var simulation = d3.forceSimulation()
                    //.alpha(0)
                    .alphaDecay(0.1)
                    .force("link", d3.forceLink().id(function(d){
                        //console.log(d.id);
                        return d.id;
                    }).distance(7).strength(2))
                    .force("charge", d3.forceManyBody().strength(-6))
                    
                    .force("center", d3.forceCenter())
                    .force("x", d3.forceX())
                    .force("y", d3.forceY());
                    //.on("tick", ticked);
    
    //console.log(dataset);
    /*
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(0, width, height, 0, 1, 1000);
    const renderer = new THREE.WebGLRenderer({alpha: true});
    var container = document.getElementsByTagName("body");
    renderer.setSize(width, height)
    container[0].appendChild(renderer.domElement) // container 这里是 document.body

    dataset.nodes.forEach((node) => {
        node.geometry = new THREE.CircleBufferGeometry(5, 32)
        node.material = new THREE.MeshBasicMaterial()
        node.circle = new THREE.Mesh(node.geometry, node.material)
        scene.add(node.circle)
      })
      
      dataset.links.forEach((link) => {
        //console.log(link);
        link.material = new THREE.LineBasicMaterial({ color: 0xAAAAAA })
        link.geometry = new THREE.Geometry()
        link.line = new THREE.Line(link.geometry, link.material)
        scene.add(link.line)
      })

      */

    simulation
        .nodes(dataset.nodes)
        .on("tick", ticked);
    simulation.force("link").links(dataset.links);
    //console.log("drag");
    d3.select(canvas)
        .call(d3.drag()
            .container(canvas)
            .subject(dragsubject)
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));
    dataset.links.forEach(dwLink);
    dataset.nodes.forEach(dwNode);
    app.ticker.add(delta => gameLoop(delta));
    //console.log(app.stage.children);

    /*
    function ticked () {
        dataset.nodes.forEach((node) => {
            //console.log(node);
            const { x, y, circle } = node
            //console.log(x,y,circle);
            circle.position.set(x, y, 0)
        })
        
        dataset.links.forEach((link) => {
            const { source, target, line } = link
            line.geometry.verticesNeedUpdate = true
            line.geometry.vertices[0] = new THREE.Vector3(source.x, source.y, -1)
            line.geometry.vertices[1] = new THREE.Vector3(target.x, target.y, -1)
        })
        
        renderer.render(scene, camera)
    }

    */
//
//
//
//

    function ticked() {
        //console.log(simulation.alpha());
        /*
        context.clearRect(0, 0, width, height);
        context.save();
        context.translate(width / 2, height / 2);
        */
        //app.stage.removeChildren();
        
        //var gradient = context.createLinearGradient(0,0,170,0);
        /*
        context.beginPath();
        dataset.nodes.forEach(drawNode);
        context.fill();
        
        context.strokeStyle = "#fff";
        context.stroke();
        */
       /*
        context.beginPath();
        dataset.links.forEach(drawLink);
        context.fill();
        context.stroke();
        context.beginPath();
        dataset.links.forEach(drawSoc);
        context.fill();
        context.restore();
        */
        if(simulation.alpha()<=0.05){
            
            simulation.stop();
        }
        
        /*
        dataset.links.forEach(function(d){
            var i = 0;
            var line = app.stage.getChildAt(i);
            
        })
        */
        
        //app.stage.renderWebGL(new PIXI.WebGLRenderer);
        
    }
    function dwNode(d){
        let circle = new PIXI.Graphics();
        circle.beginFill(0xadd8e6);
     //   if(d.index == 5316){

   //         circle.beginFill(0x000000);
            
   //     }
        circle.position.x = d.x+width/2+1;
        circle.position.y = d.y+height/2+1;
        circle.drawCircle(-1,-1,2);
        
        
        circle.endFill();
        //console.log(d);
        let text = new PIXI.Text(d.id,{fontsize:1,fill:0x999999});
        text.alpha = 0.5;
        text.setTransform(0,0,0.3,0.3);
        circle.addChild(text);
        app.stage.addChild(circle);
    }
    function dwLink(d){
        let line = new PIXI.Graphics();
        line.lineStyle(2,0xffb6c1,1);
    //    line.position.x = d.source.x+width/2;
    //   line.position.y = d.source.y+height/2;
       // if(d.index==507||d.index==1350){
       //     line.lineStyle(5,0x32dc32,1);
            
       // }
     //   line.moveTo(0, 0);
     //   line.lineTo(d.target.x+width/2, d.target.y+height/2);
        line.moveTo(d.source.x+width/2, d.source.y+height/2);
        line.lineTo(d.target.x+width/2, d.target.y+height/2);
        app.stage.addChild(line);
    }

    function drawLink(d) {
        //console.log(d);
        
        context.moveTo(d.source.x, d.source.y);
        context.lineTo(d.target.x, d.target.y);
        context.strokeStyle = "#aaa";
        
        context.moveTo(d.target.x + 4, d.target.y);
        context.arc(d.target.x, d.target.y, 4, 0, 2 * Math.PI);
        context.fillStyle = "LightSalmon";
        
        
    }

    function drawSoc(d){
        context.moveTo(d.source.x + 2, d.source.y);
        context.arc(d.source.x, d.source.y, 2, 0, 2 * Math.PI);
        context.fillStyle = "LightSlateGray";
    }
        
    function drawNode(d) {
    context.moveTo(d.x + 2, d.y);
    context.arc(d.x, d.y, 2, 0, 2 * Math.PI);
    }

    function dragsubject() {
        return simulation.find(d3.event.x - width / 2, d3.event.y - height / 2);
    }
      
    function dragstarted() {
    if (!d3.event.active) simulation.alphaTarget(0.1).restart();
    d3.event.subject.fx = d3.event.subject.x;
    d3.event.subject.fy = d3.event.subject.y;
    }
    
    function dragged() {
    d3.event.subject.fx = d3.event.x;
    d3.event.subject.fy = d3.event.y;
    }
    
    function dragended() {
    if (!d3.event.active) simulation.alphaTarget(0);
    d3.event.subject.fx = null;
    d3.event.subject.fy = null;
    }

    
}
