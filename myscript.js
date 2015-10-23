/*
TODO

-Pretty GUI
-Use new API

*/
if(dev) console.log("myscript.js is running.");

var prefCurrency;
var rates = {};
var dev = true;

chrome.storage.sync.get('prefCurrency', function(obj) {
	if(dev) console.log("getting prefCurrency");

	prefCurrency = obj.prefCurrency;
	var regex = /[\$\€\£\元\¥]{1}\ ?[+-]?[0-9]{1,3}(?:,?[0-9])*(?:\.[0-9]{1,2})?/g;
	var found = document.body.innerHTML.match(regex);
	var index;

	if(dev) console.log('found: ' + found);

	for(index in found){
		var value = found[index];
		var symbol = value.charAt(0);
		var quantity = value.substring(1).replace(',', '');

		//Don't convert preferred currency into itself
		if(getCurrencyCode(symbol) != prefCurrency) {
			
			//Check if symbol is in rates
			if(rates[symbol] === undefined) {
				if(dev) console.log("setting new conversion rate");
				
				getConversionRate(getCurrencyCode(symbol), prefCurrency, function(){
					if(dev) console.log("rates[" + symbol + "] = " + rates[symbol]);
					if(dev) console.log(rates[symbol] * quantity);

					var converted = accounting.formatMoney(rates[symbol] * quantity, getCurrencySymbol(prefCurrency));

					if(dev) console.log(value + " to " + prefCurrency + " = " + converted);
					document.body.innerHTML = document.body.innerHTML.replace(found[index], converted);
				});
			}
			else {
				if(dev) console.log("rates[" + symbol + "] = " + rates[symbol]);
				if(dev) console.log(rates[symbol] * quantity);
				var converted = accounting.formatMoney(rates[symbol] * quantity);
				if(dev) console.log(value + " to " + prefCurrency + " = " + converted);
				document.body.innerHTML = document.body.innerHTML.replace(found[index], converted);
			}
		}		
	}
});

function getConversionRate(from, to, callback) {
	//http://www.freecurrencyconverterapi.com/api/v3/convert?q=USD_PHP&compact=y
	var convString = from + '_' + to;
	var url = 'http://www.freecurrencyconverterapi.com/api/v3/convert?q=' + convString + '&compact=y';
	if(dev) console.log('Before getJSON -> convString: ' + convString);
	$.getJSON(url, function(data) {
			if(dev) console.log('convString: ' + convString);
			if(dev) console.log('url: ' + url)
			if(dev) console.log('data: ' + JSON.stringify(data));
   			if(dev) console.log('data[convString]["val"]: ' + data[convString]["val"]);
     		rates[getCurrencySymbol(from)] = data[convString]["val"];
   			if(dev) console.log('rates: ' + JSON.stringify(rates));
    		callback();
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
