# 分页

组件自带分页，默认开启了分页，当然您可以关闭分页，使用自己的分页组件。

## 基础分页

组件默认开启了分页，你可以通过 `pagination` 配置显示或隐藏。

:::demo

pagination/basic

:::

## 分页配置

你可以通过 `pagination` 个性化配置分页功能。

- 使用 `showQuickJumper` 开启带快速跳转的分页。
- 使用 `showSizeChanger` 开启带页面展示数量选择的分页。
- 使用 `showTotal` 开启带数据总量显示的分页。

:::demo

pagination/config

:::

## 分页加载

通过简单的 `ajax` 读取方式，演示了如何从服务端读取并展现数据。

:::demo

pagination/ajax

:::
