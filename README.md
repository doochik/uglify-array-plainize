uglify-array-plainize
=====================

UglifyJS plugin to convert modern array methods (forEach, map, filter) to plain JS for-loop

It's just an experiment.

The main reason is that native array methods are [slower than for-loop](http://jsperf.com/for-loop-vs-foreach-vs-reduce/3). So if you need extremely fast JS code you should avoid to use it.

There are many examples in `test` path.

For example,
```js
a.forEach(function(myValue) {
    console.log(myValue);
});
```

converted to
```js
(function(ugAP_array_reference) {
    for (var ugAP_iterator = 0, ugAP_array_length = ugAP_array_reference.length; ugAP_iterator < ugAP_array_length; ugAP_iterator++) {
        var myValue = ugAP_array_reference[ugAP_iterator];
        console.log(myValue);
    }
})(a);
```
