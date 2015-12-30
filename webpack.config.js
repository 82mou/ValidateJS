var path = require("path");
var nodeModulesPath = path.join(__dirname, 'node_modules');

module.exports = {
    entry: {
        app: './src/js/app.js'
    },
    output: {
        path: __dirname + "/assets/js",
        filename: '[name].js'
    },
    bail: true,
    resolve: {
        extensions: ['.ts', '.js', ''],
        alias: {
            Validate: __dirname + '/lib/Validate'
        },
        root: [
            nodeModulesPath
        ],
        modulesDirectories: [
            'node_modules'
        ]
    },
    module: {
        loaders: [
            {test: /\.js/, exclude: /node_modules|test/, loaders: ['babel?presets[]=es2015']}
        ]
    }
};