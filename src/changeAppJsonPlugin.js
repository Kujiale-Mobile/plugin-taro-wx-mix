const PLUGIN_NAME = "changeAppJsonPlugin";
class changeAppJsonPlugin {
	constructor(options) {
    this.options = options
	}
  apply(compiler) {
    this.context = compiler.context;
    // run 的时候
    compiler.hooks.run.tapAsync(PLUGIN_NAME, async (compiler, callback) => {
      await this.run(compiler, callback);
    });
    // watch 的时候
    compiler.hooks.watchRun.tapAsync(
      PLUGIN_NAME,
      async (compiler, callback) => {
        await this.run(compiler, callback);
      }
    );
  }
  async run(compiler, callback) {
    compiler.hooks.emit.tapPromise(PLUGIN_NAME, async (compilation) => {
      const { assets } = compilation
      if(assets['app.json'] && JSON.parse(assets['app.json'].source()).wxAppJson) {
        const json = JSON.parse(assets['app.json'].source())
        const { wxAppJson } = json
        this.mergeWxAppJson(json, wxAppJson)
        delete json.wxAppJson
        assets['app.json'].source = () => JSON.stringify(json)
			}
    });
    callback();
  }
  mergeWxAppJson(json, wxAppJson) {
    let newJson = {}
    for (let i in wxAppJson) {
      // 对于 pages 会以 push 的形式处理, 其他相同属性会直接覆盖
      if (i == 'pages' && Array.isArray(wxAppJson[i])) {
        for (let path of wxAppJson[i]) {
          if(typeof path == 'object' && path.homePage) {
            json[i].unshift(path.path)
          } else {
            json[i].push(path)
          }
        }
      } else {
        if(i == 'pages') console.warn('[changeAppJsonPlugin]: pages 必须是数组, 不然会有错误🙅‍♂️')
        json[i] = wxAppJson[i]
      }
    }
  }
}
module.exports = changeAppJsonPlugin;
