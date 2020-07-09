#### 技术栈
Next.js + Mobx + Ant Design + Axios + TypeScript

#### 目录结构说明
```
├─.babelrc            babel配置  
├─jsconfig.json       这里对js文件进行配置  
├─next-env.d.ts   
├─next.config.js      webpack以及项目的配置文件
├─package.json   
├─README.md     
├─tsconfig.json       typescript相关配置
├─yarn-error.log   
├─yarn.lock   
├─utils               工具类，封装axios
|   ├─http.js    
|   └index.js   
├─store               Mobx相关
|   ├─index.js  
|   └store.js  
├─static  
├─server              自定义server（路由文件）
|   └index.js  
├─public  
├─pages               页面
|   ├─index.js  
|   ├─index.less  
|   ├─_app.js  
|   ├─homepage  
|   |    ├─index.less  
|   |    └index.tsx  
├─config               配置文件，如api地址等
|   └index.js  
├─components           组件
|     ├─layout  
|     |   ├─index.less  
|     |   └index.tsx  
├─assets  
|   └antd-custom.less  自定义antd样式  
├─api  
|  └test.js  

```

#### TypeScript
不喜欢使用TS的可以使用正常的js文件即可