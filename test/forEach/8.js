// a.forEach(fn)
a.forEach(fn);
// *result*
(function(ugAP_array_reference) {
    for (var ugAP_iterator = 0, ugAP_array_length = ugAP_array_reference.length; ugAP_iterator < ugAP_array_length; ugAP_iterator++) {
        fn(ugAP_array_reference[ugAP_iterator], ugAP_iterator, ugAP_array_reference)
    }
})(a);
