/**
 * @author Tim Hung
 */

var prefCurrencySelect = document.getElementById('prefCurrency');

//Create prefCurrency key if nonexistant
// if(localStorage.getItem('prefCurrency') === null){
// 	localStorage.setItem('prefCurrency', 'usd');
// }

document.addEventListener('DOMContentLoaded', function()
{
	document.getElementById('prefCurrency').addEventListener('change', function()
	{
		var elementCurrencyValue = document.getElementById('prefCurrency').value;
		chrome.storage.sync.set({'prefCurrency': elementCurrencyValue});
		chrome.browserAction.setBadgeBackgroundColor({'color': [0,0,0,128]});
		chrome.browserAction.setBadgeText({'text': getCurrencySymbol(elementCurrencyValue)});
	});
});

function getCurrencySymbol(code) {
	switch(code) {
		case 'USD':
	        return "$";
        case 'EUR':
	        return "€";
	    case 'GBP':
	        return "£";
        case 'CNY':
	        return "CNY";//"元";
	    case 'JPY':
	        return "¥";
	    default:
	        return null;
	}
}