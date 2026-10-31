# weixing-ppt-style 

用于中文科研、工程、项目申报答辩和周汇报的PPT设计技能。通过文字版式配方、组件语法与辅助代码，组织内容饱满、样式丰富、层级清楚的图文页面。

**公开版本仅包含文字规则、JSON索引和代码，不附带原始PPT、模板文件、截图、照片、标识或原项目资料。** 使用时可以只提供文字和页数要求；技能会按内容主动寻找或制作配图。已有真实数据与图片时一并提供。

## 安装与调用

下载本仓库ZIP，或执行：

```shell
git clone https://github.com/xw6668888-code/weixing-ppt-style.git
```

将仓库内完整的 `weixing-ppt-style` 文件夹复制到个人Codex技能目录。Windows默认位置为 `%USERPROFILE%\.codex\skills\weixing-ppt-style`；其他系统通常为 `~/.codex/skills/weixing-ppt-style`。已有同名技能时先备份，再决定是否替换。

调用示例：

```text
使用 $weixing-ppt-style，根据我提供的材料制作12页中文科研汇报PPT。
如果只有文字，请按页面目的检索网页或论文配图、生成概念插画或画原生示意图，实际取得并嵌入素材。
先按内容关系选择整页结构，再组织图文相框、嵌套模块、标题条和连接线。
保留必要信息和真实证据，导出后逐页检查边角、遮挡、换行和可读性。
```

## 包含什么

- 四类风格：日常科研 `weekly`、正式项目 `research`、科技答辩 `banner`、清浅申报 `classic`。
- 12类组件规则、17种整页结构，以及常见汇报内容到版式的路由。
- 字体层级、颜色、边框、图注、局部放大、箭头语义与视觉检查方法。
- 文字版式检索脚本和可编辑组件辅助代码。
- 圆角标题带共用轮廓、虚线框居中实色标题牌等细节规则。
- 纯文字/少图流程：按内容选取网页实图、论文原图、生成概念图或可编辑示意，保留来源与图文对应关系。

入口：[SKILL.md](weixing-ppt-style/SKILL.md)。重点参考：[组件语法](weixing-ppt-style/references/component-grammar.md)、[整页搭法](weixing-ppt-style/references/composition-playbook.md)、[质量检查](weixing-ppt-style/references/quality-checks.md)。

只有文字时重点使用 [视觉内容补全](weixing-ppt-style/references/visual-enrichment.md)。图片检索、生图与PPT制作使用当前环境可用的工具，技能本身不捆绑生图模型或API密钥。来源图、生成图及论文保存在当前PPT工作区，不会随技能下载。工具不可用时按实际能力改用原生示意并说明限制；主要框图、标题、标注与连接仍可编辑。

## 检索版式

在仓库目录中运行：

```shell
python weixing-ppt-style/scripts/query_layouts.py --query "技术路线" --profile research
python weixing-ppt-style/scripts/query_layouts.py --query "科学证据" --profile weekly
```

脚本只读取包内文字索引，不依赖任何源PPT或图片目录。

## 实现与使用边界

设计规则可以配合可用的演示文稿制作工具使用。`component-kit.mjs` 是 Artifact Tool 的可选构件辅助代码，需要相应的演示文稿对象；它不是独立生成器，不负责导出和渲染。具体接口、单位与图片格式说明见 [实现说明](weixing-ppt-style/references/implementation-notes.md)。

分享版根据文字规则重建版式，实际效果仍取决于当前材料和逐页视觉检查。不要把素材不足补成虚构结果，也不要将整页截图作为可编辑PPT交付。用户另给明确模板时以该模板为准。

当前发布为 `2.3-share`。`skill-manifest.json` 记录本次技能文件的大小和SHA-256，便于核对完整性。
