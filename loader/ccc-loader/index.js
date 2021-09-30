const loaderUtils = require("loader-utils");
function loader(source) {
  const options = loaderUtils.getOptions(this);
  if (options.name) {
    return source.replace("cuc-", options.name + "-");
  }
  return source;
}
module.exports = loader;
