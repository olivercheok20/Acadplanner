// exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
//     if (stage === "build-html") {
//         actions.setWebpackConfig({
//             module: {
//                 rules: [
//                     {
//                         test: /node_modules\/react-metismenu/,
//                         use: loaders.null(),
//                     },
//                     {
//                         test: /node_modules\/react-metismenu-router-link/,
//                         use: loaders.null(),
//                     },
//                 ],
//             },
//         })
//     }
// }