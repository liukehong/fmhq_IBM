  寒假结束了，趁着寒假，自己玩了一下element和echarts去实现了一个简单的后台管理系统。
项目比较简单，十分适合入门，涉及到了轮播图，表格，表单，echarts柱形图和折线图，以及网页的响应式等。

```
src
  |---common                     // 公用的文件
        |---css
             |---base.scss      // 公用的css样式
        |---components          // 组件      
             |---Carousel.vue   // 轮播图组件
             |---Form.vue       // 表单组件
             |---Tables.vue     // 表格组件
             |---TheHeader.vue  // header组件
             |---TheNav.vue     // 左侧导航栏组件
             |---TwoEcharts.vue // 柱形图和折线图组件
        |---images
             |---portrait.png   // 头像
        |---router
             |---index.js       // 路由
        |---views
             |---CarouseTable.vue // 轮播图和表格页面
             |---Echarts.vue      // echarts图表页面
             |---FormView.vue     // 表单页面
  |---App.vue                     // 总app入口
  |---main.js                     // app实例

```
### 效果：
#### pc端：
![pc_one](https://github.com/HolyZheng/Backstage-management-system/blob/master/giF/pc_one_.gif)
![pc_two](https://github.com/HolyZheng/Backstage-management-system/blob/master/giF/pc_two.gif)
![pc_three](https://github.com/HolyZheng/Backstage-management-system/blob/master/giF/pc.gif)
#### 移动端：
![mobile_one](https://github.com/HolyZheng/Backstage-management-system/blob/master/giF/mobile_one.gif)

![mobile_one](https://github.com/HolyZheng/Backstage-management-system/blob/master/giF/mobile_two.gif) 

![mobile_one](https://github.com/HolyZheng/Backstage-management-system/blob/master/giF/mobile_three.gif)

# 技术栈
- vue ^2.5.2、 vue-router
- scss
- Element (表格，表单，布局等)
- Echarts (柱形图和折线图)



# element-vue-project

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
