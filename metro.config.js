const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

if (!config.resolver.assetExts.includes("pdf")) {
  config.resolver.assetExts.push("pdf");
}

module.exports = withNativeWind(config, {
  input: "./global.css",
});