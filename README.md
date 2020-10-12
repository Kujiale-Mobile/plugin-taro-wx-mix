# plugin-taro-wx-mix

用于 Taro 原生混合开发的 Taro 插件

# 安装

```shell
yarn add plugin-taro-wx-mix -D
// or
npm install plugin-taro-wx-mix -D
```

# 使用

请确保 Taro CLI 已升级至 Taro 2/3 的最新版本。

修改项目 config/index.js 中的 plugins 配置为如下

```javascript
const config = {
  ...
  plugins: [
    ...其余插件

    ['plugin-taro-wx-mix', {
      // 需要配置原生代码包地址
      dir: 'src/native'
    }]
  ]
  ...
}
```

随后在 Taro 2 的版本可以在 app.js 的 config 里配置。Taro 3 的版本可以在 app.config.js 里配置。

```javascript
config = {
  // 原生开发包的配置
  wxAppJson: {
    pages: [],
  },
  // Taro 开发包的配置
  pages: [],
};
```

如果是用 Typescript 开发，需要 Type。

```typescript
import { Config } from '@tarojs/taro';
type OutPutConfig = Omit<Config, 'pages'> & {
  pages?: Array<string | { path: string; homePage: boolean }>;
};
type NewConfig = Config & { wxAppJson: OutPutConfig };

config: NewConfig = { ... }
```
