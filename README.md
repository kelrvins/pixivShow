# 移动端项目
## 手机端图片展示

1.json数据源放置在 https://www.easy-mock.com/  ，通过ajax读取

2.载入页面是检查当前浏览器是否支持localstorage，是则检查是否存在key为like，不存在且未喜欢时在点击收藏时弹窗告知

3.载入页面是加载json文件，加载成功时开始渲染

4.根据json数据机构，将每一天的图片以日期间隔开，并生成日期放置于图片上方，且当此日期dom距离屏幕顶部100px时更新屏幕左上角日期

5.循环将json解析并生成dom，渲染时检查是否在localstorage已经标记为喜欢，喜欢则添加颜色

6.遍历结束一次性将dom写入

7.当图片距离屏幕底部小于200px时开始加载

8.点击喜欢时检查localstorage中是否存在，存在则删除，不存在则写入

9.点击收藏夹时便利localstorage中key为like的值，重新遍历json并匹配localstorage然后展示

```
cnpm install
webpack 
```