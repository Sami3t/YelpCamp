let currentPriceLabel = document.querySelector("#currentPriceSetting");

let priceRange = document.querySelector(".priceRange");

let val;

    priceRange.oninput = function() {
        val = priceRange.value;
        currentPriceLabel.innerHTML = val;        
    };
    
    
    // function myFunction() {
    //    var val = document.getElementById("slider").value //gets the oninput value
    //    document.getElementById('output').innerHTML = val //displays this value to the html page
    //    console.log(val)
    // }