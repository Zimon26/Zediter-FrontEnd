# Zediter 前端部分

## 一. 由来和意义

​	Zediter是11月一天跟朋友Zeb说起的一个项目构思，项目还未成的时候就有了Zediter的名字，因为英文昵称中我一直是Zimon他是Zeb

​	Zediter希望实现开箱即用的线上文本协作编辑，说起文本编辑，那自然我们两个人再怎么想也想不出比现行流行的腾讯文档，金山文档更加全面而合理的方案。并且鉴于我们还不够老练的代码水平，我们并没有希望去做一个能自如处理多种格式文件（比如doc，xls，pdf等）的网站。

​	那么问题是，虽然是一个练习项目，这个项目有没有什么可以出彩的地方呢？实际上线的话有意义吗？

​	根据我们的观察，还是有一点的。

​	金山文档和腾讯文档大概都需要建立一个文档，虽然新建一个doc没什么难度，但是有些时候协作就几百字，并且还有人专门负责调格式，那我们有必要文件满天飞吗？我自己做过小组作业的整合人，收到七八份doc，每个人平均下来不到200字，给人感觉就是杂乱。

​	那你可能会问，那组长建一个共享文档不就好了，金山腾讯依然优势明显。请让我来回答这个问题，**有些时候协作是非常轻量化的，不需要格式，共享文档确实把七八份文件整合成了一份，但是万一我根本不想要文件，我就想要一段文本呢？**并且我前面提到的两个都需要登录，万一我不想登录注册呢？**Zediter不需要登录注册，发起协作的用户将协作码发送给要一起协作的用户，加入协作的用户只需要填入分享的协作码就可以加入协作**

​	剩下的有时间继续写...

## 二. 使用方法

```shell
# 安装依赖
npm install

# 运行
npm run dev
```



## 三. 使用的技术

​	鉴于朋友目前还在琢磨其他技术，我决定先一个人做一次试试，整体前端使用vite搭建，前端框架使用React，简洁的样式大多为自己手写，个别样式使用了antd，由于这个项目我个人觉得仅有一个页面即可，我没有使用组件化（个人感觉不太理想，后续可能会改），没有使用路由（毕竟就一页），后端目前准备使用Express，复杂的部分主要体现在互不冲突的交互，后端正确而有逻辑地接收前端发来的更改记录（而不是文本框的全部内容）等等