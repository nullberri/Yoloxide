const path = require("path")

module.exports = {
    webpack: {
        configure: (config, { env, paths }) => {
            const wasmExtensionRegExp = /\.wasm$/
            config.resolve.extensions.push(".wasm")
            config.module.rules.forEach((rule) => {
                ;(rule.oneOf || []).forEach((oneOf) => {
                    if (oneOf.loader && oneOf.loader.indexOf("file-loader") >= 0) {
                        oneOf.exclude.push(wasmExtensionRegExp)
                    }
                })
            })

            // Add a dedicated loader for WASM
            config.module.rules.push({
                test: wasmExtensionRegExp,
                include: path.resolve(__dirname, "src"),
                use: [{ loader: require.resolve("wasm-loader"), options: {} }],
            })

            return config
        },
    },
}
