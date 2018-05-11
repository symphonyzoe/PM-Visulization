var dataset = [5, 10, 15, 20, 25];
/*
for (var i=0; i<30; i++){
    var newNumber = Math.random() *25;
    dataset.push(newNumber);
}
*/
/*
d3.select("body").selectAll("div")
    .data(dataset)
    .enter()
    .append("div")
    .attr("class","bar")
    .style("height", function(d){
        return d * 5 + "px";
    });  

    */
//console.log(dataset);
var h = 70;
var w = 400;
var svg = d3.select("body")
            .append("svg")
            .attr("height", h)
            .attr("width", w);
var circle = svg.selectAll("circle")
                .data(dataset)
                .enter()
                .append("circle");
circle.attr("cx", function(d, i){
    return i * 30 + d*5 ;
    })
    .attr("cy",h/2)
    .attr("r", function(d){
        return d;
    })
    .attr("fill", function(d){
        return "rgb(" + d*20 +",100,50)";
    });
d3.select("ul").on("click", function(){
    dataset = [25, 20, 5, 15, 10];
    //alert("click!");
    svg.selectAll("circle")
                .data(dataset)
                .transition()
                                .attr("cx", function(d, i){
                    return i * 30 + d*5 ;
                    })
                .attr("cy",h/2)
                .attr("r", function(d){
                        return d;
                    })
                .attr("fill", function(d){
                        return "rgb(" + d*20 +",100,50)";
                })
                
                .each("end", function(){
                    d3.select(this)
                        .transition()
                        .attr("fill", "magenta")
                        .attr("r", 7);
                });
})
