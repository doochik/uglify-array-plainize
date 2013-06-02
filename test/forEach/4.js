// a.b.forEach
a.b.forEach(function(val, i, arr) {
    console.log(val);
});
// *result*
(function(arr) {
    for (var i = 0, ugAP_array_length = arr.length; i < ugAP_array_length; i++) {
        var val = arr[i];
        console.log(val);
    }
})(a.b);
