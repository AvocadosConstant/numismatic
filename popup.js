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
		chrome.storage.sync.set({'prefCurrency': document.getElementById('prefCurrency').value});
	});
});