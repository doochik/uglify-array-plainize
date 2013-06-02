// a.forEach preserve array name
a.forEach(function(value, iter, myArrName) {
    console.log(value, iter, myArrName);
});
// *result*
(function(myArrName) {
    for (var iter = 0, ugAP_array_length = myArrName.length; iter < ugAP_array_length; iter++) {
        var value = myArrName[iter];
        console.log(value, iter, myArrName);
    }
})(a);
