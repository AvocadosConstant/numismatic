/*
TODO

-Add trailing zeros
-Pretty GUI
-Conversion in separate thread
-Symbol badge on icon

*/



//alert("myscript.js is running");

//console.log(JSON.parse(httpGet("https://rate-exchange.appspot.com/currency?from=USD&to=EUR")).rate);
//console.log(getCurrencyCode('€'));
//console.log(getConversionRate('USD','EUR'));

var prefCurrency;

chrome.storage.sync.get('prefCurrency', function(obj) {
	console.log('prefCurrency', obj.prefCurrency);
	prefCurrency = obj.prefCurrency;

	console.log(prefCurrency);

	var regex = /[\$\€\£\元\¥]{1}\ ?[+-]?[0-9]{1,3}(?:,?[0-9])*(?:\.[0-9]{1,2})?/g;
	//document.body.innerHTML = document.body.innerHTML.replace(regex , "OAIJSDOFIJAO ");

	var found = document.body.innerHTML.match(regex);

	//alert("found is " + found);

	var index;
	var rates = {"key": "value"};

	for(index in found){
		var value = found[index];
		var symbol = value.charAt(0);
		var quantity = value.substring(1).replace(',', '');


		//Check if symbol is in rates
		// if(rates[symbol] === null) {
		// 	rates[symbol] = 
		// }


		//alert("symbol: " + symbol + " | quantity: " + quantity);

		console.log(value + " to " + prefCurrency + " = " + convert(symbol,quantity));

		document.body.innerHTML = document.body.innerHTML.replace(found[index], getCurrencySymbol(prefCurrency)+convert(symbol,quantity));

	}

	//console.log(value + " to " + prefCurrency + " = " + convert("$","1.00"));

	function convert(symbol, quantity) {
	    var rate = getConversionRate(getCurrencyCode(symbol), prefCurrency);
	    //return Math.round(quantity * rate * 100) / 100;
	    //console.log('q: ' + quantity + " | r: " + rate);
		var converted = Math.round(parseFloat(quantity) * parseFloat(rate) * 100) / 100;

		//Add trailing zeros

		return converted;
	}




});

function getConversionRate(from, to) {
	//http://rate-exchange.appspot.com/currency?from=USD&to=EUR
	var url = 'https://rate-exchange.appspot.com/currency?from=' + from + '&to=' + to;
	var response = JSON.parse(httpGet(url));
	return response.rate;
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

function getCurrencySymbol(code) {
	switch(code) {
		case 'USD':
	        return "$";
        case 'EUR':
	        return "€";
	    case 'GBP':
	        return "£";
        case 'CNY':
	        return "元";
	    case 'JPY':
	        return "¥";
	    default:
	        return null;
	}
}

function httpGet(theUrl) {
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    //console.log(xmlHttp.response);
    return xmlHttp.response;
}