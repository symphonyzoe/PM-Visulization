var dataset;
d3.json("http://localhost:8000/geneData.json").then(function(data){
    //console.log(data);

    dataset = data;
    anim();
})

function anim(){
    //console.log(dataset);
    var canvas = document.getElementById("cnv")
    var context = canvas.getContext("2d"),
        width = canvas.width,
        height = canvas.height;
   // console.log("init");
    var simulation = d3.forceSimulation()
                    .force("link", d3.forceLink().id(function(d){
                        //console.log(d.id);
                        return d.id;
                    }).distance(5).strength(1))
                    .force("charge", d3.forceManyBody().strength(-5))
                    
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
        context.clearRect(0, 0, width, height);
        context.save();
        context.translate(width / 2, height / 2);
        
        
        //var gradient = context.createLinearGradient(0,0,170,0);
        /*
        context.beginPath();
        dataset.nodes.forEach(drawNode);
        context.fill();
        
        context.strokeStyle = "#fff";
        context.stroke();
        */
        context.beginPath();
        dataset.links.forEach(drawLink);
        context.fill();
        context.stroke();
        context.beginPath();
        dataset.links.forEach(drawSoc);
        context.fill();
        context.restore();
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
