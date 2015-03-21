/**
 * @author Tim Hung
 */

var prefCurrencySelect = document.getElementById('prefCurrency');

//Create prefCurrency key if nonexistant
if(localStorage.getItem('prefCurrency') === null){
	localStorage.setItem('prefCurrency', 'usd');
}

document.addEventListener('DOMContentLoaded', function()
{
	document.getElementById('prefCurrency').addEventListener('change', function()
	{
		localStorage.setItem('prefCurrency', document.getElementById('prefCurrency').value);
	});
});
//Listen for when the document is loaded, then run the following function.
// document.addEventListener('DOMContentLoaded', function()
// {
//     //Listen for a "click" on 'submitbutton', then run the following function.
//     document.getElementById('submitbutton').addEventListener("click", function()
//     {
//         //Create a variable: colorValue. Set it to the value of the input field 'fname'.
//         var colorValue = document.getElementById('color-text').value;

//         chrome.tabs.executeScript(null,
//         {
//             //Set the backgroundColor to colorValue.
//             code:"document.body.style.backgroundColor='" + colorValue + "'"
//         });

//     });

// });
