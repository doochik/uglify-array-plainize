// a.forEach preserve name for "value" var
a.forEach(function(myValue) {
    console.log(myValue);
});
// *result*
(function(ugAP_array_reference) {
    for (var ugAP_iterator = 0, ugAP_array_length = ugAP_array_reference.length; ugAP_iterator < ugAP_array_length; ugAP_iterator++) {
        var myValue = ugAP_array_reference[ugAP_iterator];
        console.log(myValue);
    }
})(a);
