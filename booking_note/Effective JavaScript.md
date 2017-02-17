#Effective JS：编写高质量JavaScript代码的68个有效方法
1了解你使用的JavaScript版本<br>
&nbsp;&nbsp;a)第一个解决方案是不要将进行严格模式检查的文件和不进行严格模式检查的文件连接起来<br>
&nbsp;&nbsp;b)第二个解决方案是通过将其自身包裹在立即调用的函数表达式中的方式连接多个文件(模块系统)<br>
2理解JavaScript的浮点数<br>
3当心隐式的强制转换<br>
4原始类型优于封装对象<br>
&nbsp;&nbsp;a)获取和设置原始类型值的属性会隐式地创建封装对象<br>
