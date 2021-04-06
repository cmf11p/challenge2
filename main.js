//Moneda - Object Declaration
class Moneda{
    constructor(obj){
        this.id=obj.id;
        this.abbr=obj.abbr;
        this.name=obj.name;
        this.conv=obj.conv; //Conversion data table
    }
    //Conversion Method
    conver(value,div){
        this.outv=value*this.conv[div];
    }
    //Method for Printin the Results
    printR(value,div){
        $("div:last").append(`<p>${value} ${this.abbr} es equivalente a ${this.outv} ${monedas[div].abbr}.</p>`);
    }
}
//Fetching and Parsing of the JSON Data
var reader = 0;
const monedas = [];
let req = new XMLHttpRequest();
req.onreadystatechange = () => {
    if (req.readyState == XMLHttpRequest.DONE) {
        reader = JSON.parse(req.responseText);
        for(const objeto of reader)
            monedas.push(new Moneda(objeto));
    } 
};

req.open("GET", "https://api.jsonbin.io/b/606b942b6397691864743c85", true);
req.setRequestHeader("secret-key", "$2b$10$dRlhGGNDi6pMXdda.AYBQuobygl32QZfPBd/eXBeaf7.jqFEQ70yW");
req.send();

//Function call when triggering the button event "click"
$("#bResultado").on("click",convdiv);

function convdiv(){
    //Fetching Form Data
    var div = document.getElementById("divisas1").value;
    var div2 = document.getElementById("divisas2").value;
    var curr = document.getElementById("div1value").value;

    //Call and Print of the Results
    var divisas=monedas.map(a => a.abbr);
    $("div:last").empty();
    $("div:last").append(`<p>Se selecciono ${monedas[div].name} (${divisas[div]}) como la moneda a convertir.</p> <p>Se selecciono ${monedas[div2].name} (${divisas[div2]}) como la moneda destino.</p>`);
    monedas[div].conver(curr,div2);
    monedas[div].printR(curr,div2);

    //Printing of the specified currency conversion table
    $("div:last").append(`<h3>Tabla de conversión de ${divisas[div]} a otras monedas.</h3>`);
    let mytable =`<table class="table table-bordered table-hover"><tr>`;
    for (const CELL of divisas) {  mytable += "<th>" + CELL + "</th>"; }
    mytable += `</tr><tr>`;
    for (const CELL2 of monedas[div].conv) {  mytable += "<td>" + CELL2 + "</td>"; }
    mytable += `</tr></table>`;
    $("div:last").append(`${mytable}`)
}

