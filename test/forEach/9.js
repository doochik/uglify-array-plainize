// a.forEach(fn)
a.forEach(fn, thisObj);
// *result*
(function(ugAP_array_reference) {
    for (var ugAP_iterator = 0, ugAP_array_length = ugAP_array_reference.length; ugAP_iterator < ugAP_array_length; ugAP_iterator++) {
        fn.call(thisObj, ugAP_array_reference[ugAP_iterator], ugAP_iterator, ugAP_array_reference)
    }
}).call(thisObj, a);
