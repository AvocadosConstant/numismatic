/*
TODO

-Pretty GUI
-Use new API

*/
console.log("myscript.js is running.");

var prefCurrency;

chrome.storage.sync.get('prefCurrency', function(obj) {
	console.log("getting prefCurrency");

	prefCurrency = obj.prefCurrency;
	var regex = /[\$\€\£\元\¥]{1}\ ?[+-]?[0-9]{1,3}(?:,?[0-9])*(?:\.[0-9]{1,2})?/g;
	var found = document.body.innerHTML.match(regex);
	var index;
	var rates = {};

	console.log('found: ' + found);

	for(index in found){
		var value = found[index];
		var symbol = value.charAt(0);
		var quantity = accounting.unformat(value);

		//Don't convert preferred currency into itself
		if(getCurrencyCode(symbol) != prefCurrency) {
			
			//Check if symbol is in rates
			if(rates[symbol] == null) {
				console.log("setting new conversion rate" + getConversionRate(getCurrencyCode(symbol), prefCurrency));
				rates[symbol] = getConversionRate(getCurrencyCode(symbol), prefCurrency);
			}
			
			console.log("rates[" + symbol + "] = " + rates[symbol]);
			console.log(rates[symbol] * quantity);

			var converted = accounting.formatMoney(rates[symbol] * quantity);

			console.log(value + " to " + prefCurrency + " = " + converted);
			document.body.innerHTML = document.body.innerHTML.replace(found[index], converted);
		}		
	}
});

function getConversionRate(from, to) {
	//http://www.freecurrencyconverterapi.com/api/v3/convert?q=USD_PHP&compact=y
	var convString = from + '_' + to;
	var url = 'http://www.freecurrencyconverterapi.com/api/v3/convert?q=' + convString + '&compact=y';
	console.log('Before getJSON -> convString: ' + convString);
	$.getJSON(url, function(data) {
			console.log('convString: ' + convString);
			console.log('url: ' + url)
			console.log('data: ' + JSON.stringify(data));
    		console.log(data[convString]["val"]);
    		//return data[convString]["val"];
		}
	);
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
