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
                    }))
                    .force("charge", d3.forceManyBody())
                    
        //            .force("center", d3.forceCenter(width/2, height/2))
                    .force("x", d3.forceX())
                    .force("y", d3.forceY());
                    //.on("tick", ticked);
    
    console.log(dataset);
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
        
    function ticked() {
        context.clearRect(0, 0, width, height);
        context.save();
        context.translate(width / 2, height / 2);
        
        
        
        context.beginPath();
        dataset.nodes.forEach(drawNode);
        context.fill();
        context.strokeStyle = "#fff";
        context.stroke();

        context.beginPath();
        dataset.links.forEach(drawLink);
        context.strokeStyle = "#aaa";
        context.stroke();

        context.restore();
    }

    function drawLink(d) {
        //console.log(d);
        context.moveTo(d.source.x, d.source.y);
        context.lineTo(d.target.x, d.target.y);
    }
        
    function drawNode(d) {
    context.moveTo(d.x + 3, d.y);
    context.arc(d.x, d.y, 3, 0, 2 * Math.PI);
    }

    function dragsubject() {
        return simulation.find(d3.event.x - width / 2, d3.event.y - height / 2);
    }
      
    function dragstarted() {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
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
