// [1,2,3].forEach
[1,2,3].forEach(function(val, i, arr) {
    console.log(val, i, arr);
});
// *result*
(function(arr) {
    for (var i = 0, ugAP_array_length = arr.length; i < ugAP_array_length; i++) {
        var val = arr[i];
        console.log(val, i, arr);
    }
})([ 1, 2, 3 ]);

