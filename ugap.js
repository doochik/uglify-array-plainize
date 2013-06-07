module.exports = {
    plainize: function(content) {
        var originalAST;
        try {
            originalAST = UglifyJS.parse(content);
        } catch(e) {
            console.error('Cant parse js file');
            throw e;
        }


        var ugapTransformer = new UglifyJS.TreeTransformer(function(node){
            if (itIsCall(node, 'forEach')) {
                var forEachCb = node.args[0];
                // arr.forEach(fn)
                if (forEachCb instanceof UglifyJS.AST_SymbolRef) {
                    return genAST(
                        node.expression.expression,
                        [],
                        forEachCb.name,
                        node.args[1]
                    );

                } else {
                    return genAST(
                        node.expression.expression,
                        forEachCb.argnames,
                        forEachCb.body,
                        node.args[1]
                    );
                }
            }
        });

        var newAST = originalAST.transform(ugapTransformer);
        return newAST.print_to_string({ beautify: true });
    }
};

var UglifyJS = require('uglify-js');

function itIsCall(node, name) {
    return node instanceof UglifyJS.AST_Call &&
        (
            node.expression.property == name || // arr.forEach
                (node.expression.property && node.expression.property.value == name) // arr['forEach']
            )
}

function genAST(arrayReference, args, body, thisObj) {
    // args - forEach(function(arrayItemValue, iterator, array){})

    var arrayItemValue = args[0] || new UglifyJS.AST_SymbolRef({name: 'ugAP_array_item_value'});
    var arrayIterator = args[1] || new UglifyJS.AST_SymbolRef({name: 'ugAP_iterator'});
    var arrayRef = args[2] || new UglifyJS.AST_SymbolRef({name: 'ugAP_array_reference'});
    var arrayLength = new UglifyJS.AST_SymbolRef({name: 'ugAP_array_length'});

    if (typeof body == 'string') {

        body = [
            new UglifyJS.AST_Call({
                expression: new UglifyJS.AST_SymbolRef({name: 'fn'}),
                args: [
                    new UglifyJS.AST_Sub({
                        property: arrayIterator,
                        expression: arrayRef
                    }),
                    arrayIterator,
                    arrayRef
                ]
            })
        ]

    } else {
        // add first string to for-loop body
        // var arrayItemValue = arrayRef["arrayIterator"]
        body.unshift(new UglifyJS.AST_Var({
            definitions: [
                new UglifyJS.AST_VarDef({
                    name: arrayItemValue,
                    value: new UglifyJS.AST_Sub({
                        property: arrayIterator,
                        expression: arrayRef
                    })
                })
            ]
        }));
    }

    var cbFunction = new UglifyJS.AST_Function({
        argnames: [arrayRef],
        name: null,
        body: [
            new UglifyJS.AST_For({
                // var
                init: new UglifyJS.AST_Var({
                    definitions: [
                        // i = 0
                        new UglifyJS.AST_VarDef({
                            name: arrayIterator,
                            value: new UglifyJS.AST_Number({value: 0})
                        }),

                        // j = arr.length
                        new UglifyJS.AST_VarDef({
                            name: arrayLength,
                            value: new UglifyJS.AST_Dot({
                                property: 'length',
                                expression: arrayRef
                            })
                        })
                    ]
                }),
                // i < j
                condition: new UglifyJS.AST_Binary({
                    left: arrayIterator,
                    operator: '<',
                    right: arrayLength
                }),
                // i++
                step: new UglifyJS.AST_UnaryPostfix({
                    expression: arrayIterator,
                    operator: '++'
                }),
                body: new UglifyJS.AST_BlockStatement({
                    body: body
                })
            })
        ]
    });

    if (thisObj) {
        return new UglifyJS.AST_Call({
            expression: new UglifyJS.AST_Dot({
                property: 'apply',
                expression: cbFunction
            }),
            args: [thisObj, arrayReference]
        });

    } else {
        return new UglifyJS.AST_Call({
            expression: cbFunction,
            args: [arrayReference]
        });
    }
}
