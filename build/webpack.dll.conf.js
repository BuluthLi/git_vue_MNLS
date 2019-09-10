// 此处以iview为例，这样预先编译后,
// 1.main.js不需要vue.use(iview);
// 2.在webpack.prod.conf.js配置 webpack.DllReferencePlugin：
// new webpack.DllReferencePlugin({
//     manifest: require('../dll/iView-manifest.json')
// }),
// 3.在index.html中引入  <script src="./src/dll/iView.dll.js"></script>
var path = require("path");
var webpack = require("webpack");
module.exports = {
    // mode: "development || "production",
    entry: {
        iView: ['iview']
    },
    output: {
        path: path.join(__dirname, "../dll"),
        filename: "[name].dll.js",
        library: "[name]"
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, "../dll", "[name]-manifest.json"),
            name: "[name]",
        }),
        new webpack.optimize.UglifyJsPlugin({})
    ]
};