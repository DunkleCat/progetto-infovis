var config_json ='{' +
    '"configurazione_1":[[637,277],[782,418],[834,182],[304,502],[554,51]],' +
    '"configurazione_2":[[797,326],[283,54],[144,506],[336,572],[878,467]],' +
    '"configurazione_3":[[817,753],[725,763],[233,727],[72,755],[627,305]],' +
    '"configurazione_4":[[397,252],[24,287],[558,205],[750,243],[880,130]],' +
    '"configurazione_5":[[438,755],[153,419],[740,707],[617,195],[675,790]]}';

function disegna_configurazione()
{
    svg.selectAll("*").remove();
    disegna_barchette(configs["configurazione_"+n]);
    d3.select("h2").text("Configurazione numero " + n);
    n = (n % configs_len) + 1;
}

function disegna_barchette(configurazione)
{
    configurazione.forEach(disegna_barchetta);

    d3.select("body")
	.on("keydown", () => {delete_pressed = d3.event.keyCode === 88;})
	.on("keyup", () => {delete_pressed = false;});
    svg.selectAll("*")
	.on("mouseover", () => {current_object = this;})
	.on("mouseout", () => {current_object = null;})
    	.on("click", (d, i, elements) => {if (delete_pressed) { d3.select(elements[i]).remove();}});
}

function disegna_barchetta(punto)
{
    if (Math.floor((Math.random() * 2) + 1) == 1) {
	disegna_barchetta_orizzontale(punto);
    } else {
	disegna_barchetta_verticale(punto);
    }
}

function disegna_barchetta_verticale(punto)
{
    var x = punto[0];
    var y = punto[1];

    var path = [
    	[x,y],
    	[x+10,y-10],
    	[x+10,y-30],
    	[x,y-40],
    	[x-10,y-30],
    	[x-10,y-10],
    	[x,y]
    ];

    var line_generator = d3.line();
    svg.append("path")
    	.transition()
    	.attr("d", line_generator(path))
    // 	.attr("id", "barchetta"+x+""+y);
}

function disegna_barchetta_orizzontale(punto)
{
    var x = punto[0];
    var y = punto[1];

    var path = [
	[x,y],
	[x+10,y+10],
	[x+30,y+10],
	[x+40,y],
	[x+30,y-10],
	[x+10,y-10],
	[x,y]
    ];

    var line_generator = d3.line();
    return  svg.append("path")
	.transition()
	.attr("d", line_generator(path))
	.attr("id", "barchetta"+x+""+y);
}

d3.select();
d3.selectAll();

d3.select("title")
    .text("Mini-progetto");

d3.select("h1")
    .text("Le barchette birichine")
    .style("color","blue")
    .style("text-anchor", "middle");

d3.select("h2")
    .text("Pronti?")

d3.select("h3")
    .text("Le barche hanno posizione fissa ma orientamento (orizzontale, verticale) casuale");

var svg_width = 1000;
var svg_height = 800;
var svg = d3.select("svg")
    .attr("class", "svg-container")
    .attr("width", svg_width)
    .attr("height", svg_height)
//    .attr("margin", "0 auto")
    .attr("display", "block");
//    .attr("preserveAspectRatio", "xMinYMin meet")
//    .attr("viewBox", "0 0 1000 800")
//    .attr("text-anchor", "middle");

var configs = JSON.parse(config_json);
var configs_len = Object.keys(configs).length;
var n = 1;

var current_object = null;
var delete_pressed = null;

setTimeout(disegna_configurazione, 2000);
setInterval(disegna_configurazione, 5*1000);
