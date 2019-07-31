require.config({
    baseUrl: "/public/js",
    paths: {
        babel: '../js/babel.min',
        jsx: '../js/jsx',
        react: '../js/react',
        // text: '../js/text',
        // JSXTransformer: '../js/JSXTransformer'
    },
    // shim: {
    //     "react": {
    //         "exports": "React"
    //     }
    // },
    jsx: {
        fileExtension: '.js',
        // sourceMaps: "inline",
        // harmony: true,
        // stripTypes: true
    },
    config: {
        babel: {
            sourceMaps: "inline", // One of [false, 'inline', 'both']. See https://babeljs.io/docs/usage/options/
            //         fileExtension: ".js",// Can be set to anything, like .es6 or .js. Defaults to .jsx
            //         presets: ['react']
        }
    }
});