// a.forEach preserve iterator name
a.forEach(function(value, i) {
    console.log(value, i);
});
// *result*
(function(ugAP_array_reference) {
    for (var i = 0, ugAP_array_length = ugAP_array_reference.length; i < ugAP_array_length; i++) {
        var value = ugAP_array_reference[i];
        console.log(value, i);
    }
})(a);
