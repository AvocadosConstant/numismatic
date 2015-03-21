alert("myscript.js is running");


var regex = /[\$\€\£\元\¥]{1}\ ?[+-]?[0-9]{1,3}(?:,?[0-9])*(?:\.[0-9]{1,2})?/g;
//document.body.innerHTML = document.body.innerHTML.replace(regex , "OAIJSDOFIJAO ");

var found = document.body.innerHTML.match(regex);

alert("found is " + found);

var index;
for(index in found){
	//alert(found[index]);
	var value = found[index];
	var symbol = value.charAt(0);
	var quantity = value.substring(1);

	alert("symbol: " + symbol + " | quantity: " + quantity);
}


function convert(symbol, quantity) {
    
}

function getCurrencyCode(symbol) {
	switch(symbol) {
	    case '$':
	        return "USD";
        case '€':
	        return "EUR";
	    case '£':
	        return "GBP";
        case '元':
	        return "CNY";
	    case '¥':
	        return "JPY";
	    default:
	        return null;
	}
}

function httpGet(theUrl) {
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}