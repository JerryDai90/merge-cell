# mergeRowCell
竖列合并相同的单元格

fnMergeRowCell（arg0, arg1） 
</br>arg0：table 中的 tbody。 
</br>arg1：支持指定某列需要合并（写法：[0,1,2]），支持前几列需要合并（写法：4）；

模块流转图

```flow
st=>start: Start
e=>end
op1=>operation: 填写流程基本信息
op2=>operation: 设计表单
op3=>operation: 设计流程信息

st->op1->op2->op3->e
```

## 基本信息设置
### 基本表字段设计
#### 数据库字段设计
* 表单基本设置表( T_FORM_BASE_SET)：

| 字 段 | 说 明 |
|---|---|
| 主键 | -- |
| 表单数据存储目标表名称 | 区分不同类型的表单的存储地方 |
| 切面类class | 用于定制后台业务 (<font style="color: red;">规范待制定</font>)|
| 嵌入 js 路径 | 用于定制前端显示业务 |
| 界面显示的 jsp 路径 | 默认为通用显示方案。用于改变显示的样式。排版等（不过 jsp 的规范需要和通用显示方法一致 <font style="color: red;">规范待制定</font> ） |

* 表单基本字段表( T_FORM_BASE_FIELD)：

| 字 段 | 说 明 |
|---|---|
| 主键 | -- |
| 表单基本设置表主键 | T_FORM_BASE_SET.主键 |
| 创建人姓名 |  |
| 创建人主键 |  |
| 创建时间 | 创建的时候填入 |
| 更新时间 | 更新的时候填入 |

## 表单功能设计
#### 数据库字段设计
* 表单配置表( T_FORM_SET)：

| 字 段 | 说 明 |
|---|---|
| 主键 | -- |
| 表单字段显示名称 | 显示在界面的名称 |
| 非空 | 是否做非空判断 |
| 正则验证 | 需要填写的正则表达式（空为不验证） |
| 正则验证错误提示 | 提示语 |
| 表单字段占格 | 一行共4格，配置字典占格 |
| 是否显示 | 字段是否显示 |
| 表单字段类型 | 选择表单字段类，可以是输入框、下拉选择框、弹出框、其他自定义控件(<font style="color: red;">规范待制定</font>) |
| 默认值 | 初始化的时候默认显示的值 |
| 默认值类型 | sql、内置变量 |
| 表单字段候选值 | 可配置候选值，只能固定表单字段类型才会用到 |
| 表单字段候选值类型 | sql、内置变量 |


## 附录
### 切面类 class 规范
### 显示 jsp 规范
### 自定义表单控件规范
每个控件对外提供接口必须有以下方法。

```javascript
/*
* 获取控件需要保存的值
* 此值的规范可以自行定义，如果为多个对象，且不参与到数据库搜索逻辑，建议使用 JSON 来存储。
*/
var getValue = function(){};

/*
* 验证是否满足填写的规范
* @return true or false
*/
var verify = function(){};

/* 
* 调用此方法来设置控件的值
* @param value4db 保存到数据库的值（起草的时候没有值）
* @param formSetVo 和当前控件相关的 T_FORM_SET 数据
* @return selfObj
*/
var setValue = function(value){};

/* 
* 调用此方法来设置控件的值
* @param value4db 保存到数据库的值（起草的时候没有值）
* @param formSetVo 和当前控件相关的 T_FORM_SET 数据
* @param fnCallbackSection 切面回调
*       fnCallbackSection = {
*           //初始化之前调用
*           onInitBefore : function(){},
*           //初始化之后调用
*           onInitAfter : function(){}
*       }
*/
var init = function(value4db, formSetVo, fnCallbackSection){};

//最后，每个控件对象都必须注册到最外层 div 的 data 属性下面去。
//每个控件都是独立可运行。不依赖外部的全局变量（全局变量可以是自己的）且一个控件可在一个界面中运行多个。
//每个控件都务必使用闭包来实现。

```
调用时序图:

```sequence    
    主界面->表单控件: 初始化
    表单控件->表单控件: fn onInitBefore
    表单控件->init: fn init
    表单控件->表单控件: fn onInitAfter
    init-->主界面: return selfObj

    主界面->表单控件: 验证表单
    表单控件->verify: fn verify
    verify-->主界面: return true/false
    
    主界面->表单控件: 获取保存的值
    表单控件->getValue: fn verify
    getValue-->主界面: return string object
```


