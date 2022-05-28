其实全部看 mdn 就够了

# f原型
## 1.讲概念
### 原型
在 JS 中，每个由构造函数创建的对象，都拥有一个原型对象，对象以其原型为模板、从原型继承方法和属性。
### 原型链
原型对象也可能拥有原型，并从中继承方法和属性，一层一层以此类推，这样的关系被称为原型链，它解释了为什么在 JS 中一个对象会拥有，定义在其他对象中的属性和方法。
## 2.注意点
一般来说，对象不应该能够获取到原型，不过现在浏览器中都实现了 __proto__ 属性来访问这个属性，但是最好不要使用这个属性，因为这个属性已经从 Web 标准中删除，虽然一些浏览器目前仍然支持它，但也许会在未来的某个时间停止支持，请尽量不要使用该特性。我们可以使用 Object.getPrototypeOf() 方法来获取对象的原型。
## 3.缺点
在原型链上查找属性会比较耗时，对性能有副作用，这在性能要求严苛的场景下影响很大。比如，用for...in 遍历对象的属性时，原型链上的每个可枚举属性都会被枚举出来。
## 4.解决方案
要检查对象是否具有自己定义的属性，而不是其原型链上的某个属性，可以使用从 Object.prototype 继承的 hasOwnProperty 方法，这样避免了查找原型链，可以提升一些性能。

## f坑爹原型题 (聊完 原型 大概率会做这些坑爹题)
关键: 现在操作的是`函数`还是`对象`。
### 函数
1. `函数.__proto__ === Function.prototype`
2. `Foo.constructor === Function` => `Function.constructor === Function`  环
### 对象
1. `xx.prototype.__proto__ === Object.prototype`。
2. `Object.prototype.__proto === null`  单链表


## f继承 (聊完 原型 可能会让我手写)
### 寄生组合继承
这个是用 ES5 实现继承比较好的方式，优点:
1. 没有父类的实例属性。
2. 一个原型对象共享给多个实例。
```js
// 父类
function Father() {}
// 子类
function Son() {}
// 通过寄生方式，砍掉父类的实例属性，避免了组合继承生成两份实例的缺点
Son.prototype = Object.create(Father.prototype);
// 修复构造函数指向
Son.prototype.constructor = Son;
```
### class继承
ECMA-262 规范推荐的写法，注意两点:
1. 使用extends表明继承自哪个父类。
2. 在子类构造函数中必须调用super。
```js
class Son extends Father {
  constructor(name) {
    super(name);
    this.name = name || "son";
  }
}
```

# f作用域
## 1.讲概念
### 作用域
作用域分为全局作用域、函数作用域、以及 ES6 的块级作用域。 作用域是对变量可访问范围的限制，内层作用域可以访问外层作用域，但是反过来，外层作用域是不可以访问内层作用域的。
### 作用域链
在当前作用域中查找变量，如果没有找到，就去父级作用域查找，找不到就再往上，一直找到全局作用域为止，这一层层关系形成了一条链，这就是作用域链。
### 预解析
预解析(Hoisting) 是伴随作用域的概念。在JS代码执行之前，也就是编译阶段，先把var变量的声明和函数的声明，提升到当前作用域的顶部。这样即使函数声明写在函数使用的后面，也可以正常执行。
注意: 当一个函数遇到一个同名的值为undefined的变量，会忽略掉这个undefined变量，所以同名的变量和函数都提升时，函数会覆盖掉这个变量。
## 2.说用途
作用域链的作用是保证对`执行环境有权访问的所有变量`和`函数`的`有序访问`，通过作用域链，可以一层层按顺序访问到外层环境的变量和函数。

# f执行上下文
## 1.讲概念
执行上下文分为全局执行上下文、函数执行上下文、eval执行上下文。
### 全局执行上下文
任何不在函数内部的都是全局执行上下文，它首先会创建一个全局的window对象，并且设置this的值等于这个全局对象，一个程序中只有一个全局执行上下文。
### 函数执行上下文
当一个函数被调用时，就会为该函数创建一个新的执行上下文，函数的上下文可以有任意多个。
### eval上下文
执行在eval函数中的代码会有属于他自己的执行上下文。
## 2.说用途
JavaScript解释器开始执行代码时，首先会创建全局执行上下文，后面每次调用一个函数，都会创建一个新的执行上下文。
每次创建一个执行上下文时，该执行上下文就会被添加到调用栈的顶部。浏览器总是执行位于调用栈链顶部的执行上下文，一旦执行完毕，该执行上下文就会从调用栈中弹出，然后控制权来到栈的下一个执行上下文中。

# f闭包
## 1.讲概念
一个函数和对其周围状态的引用捆绑在一起，这样的组合就是闭包。也就是说，闭包可以在一个内层函数中访问到外层函数的作用域。在 JS 中，每当创建一个函数，闭包就会在函数创建的同时被创建出来。
## 2.说用途
闭包可以模拟私有属性和私有方法，常用的场景有防抖、节流等场景。
## 3.使用闭包的注意点
如果引用闭包的函数是一个全局变量，那么闭包会一直存在直到页面关闭；但如果这个闭包以后不再使用的话，就会造成内存泄漏。
## 聊到这里可能让我手写 防抖与节流
```js
// 防抖: 短时间内多次触发，只执行最后一次  (immediate参数控制首次是否触发)
function debounce(fn, time, immediate = false) {
  let timer = null;
  return function () {
    if (immediate) {
      fn();
      immediate = false;
      return;
    }
    if (timer !== null) {
      clearTimeout(timer);  // 清除上次延时任务，重新设置一次
    }
    timer = setTimeout(() => {
      fn();
      timer = null;
    }, time);
  }
}
// 节流: 持续触发，每隔一段时间执行一次
function throttle(fn, time) {
  let last = new Date();
  return function () {
    const now = new Date();
    if (now - last >= time) {  // 间隔时间后才触发
      fn();
      last = now;
    }
  }
}
```

# f内存泄漏
## 1.讲概念
内存泄漏是指程序中已分配的堆内存由于某种原因程序未释放或无法释放，造成系统内存的浪费，导致程序运行速度减慢甚至系统崩溃。
## 2.特点
内存泄漏缺陷具有隐蔽性、积累性的特征，比其他内存非法访问错误更难检测。因为内存泄漏的产生原因是内存块未被释放，属于遗漏型缺陷而不是过错型缺陷。
内存泄漏通常不会直接产生可观察的错误症状，而是逐渐积累，降低系统整体性能，极端的情况下可能使系统崩溃。
## 3.如何防止内存泄漏
1. 检查是否有意外的全局变量没有清除。
2. 清除定时器内部的变量。比如设置了 setInterval 而忘记取消，如果循环函数有对外部变量的引用的话，那么这个变量会被一直留在内存中无法被回收。
3. 在低版本的浏览器环境下，要防止循环引用。某些低版本浏览器的垃圾回收机制还在使用引用计数，循环引用的内存无法释放，会造成内存泄漏。

# fbind/call/apply
## 1.讲概念
### bind
bind 方法创建一个新的函数，在 bind 被调用时，这个新函数的 this 被指定为 bind 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。
### call
call 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。
### apply
apply 方法调用一个具有给定this值的函数，以及以一个数组（或类数组对象）的形式提供的参数。
## 2.注意点
已经被 bind 绑定 this 的函数，再通过 call或者 apply 传入 this 来执行，传入的 this 是不会生效的，生效的只有 bind 的 this。包括连续的 bind，也只有第一次 bind 会生效， this 永远指向第一次 bind 的参数。
## 手写 (大概率会写)
```js
Function.prototype.myApply = function () {
  // 要判断一下，因为有可能有这种情况:
  // const o = {};  Object.setPrototypeOf(o, Function.prototype);
  if (typeof this !== 'function') {
    throw new TypeError('this is not a function');
  }
  // 没传就是 window
  const ctx = arguments[0] || window;
  // arguments[1] 传的必须是数组
  const args = arguments[1] ? [...arguments[1]] : [];
  // 挂到 context 上，使 fn 以 context 为 this 执行。
  // 担心 context 会有重复变量名，为了不覆盖它，用 Symbol 生成一个唯一的属性名
  // 这样既不影响原对象，又能达到 apply 的目的
  const fnName = Symbol('fnName');
  ctx[fnName] = this;
  // 执行
  const result = ctx[fnName](...args);
  // 删掉挂上去的属性
  delete ctx[fnName];
  // 返回结果
  return result;
}
Function.prototype.myCall = function () {
  // 要判断一下，因为有可能有这种情况:
  // const o = {};  Object.setPrototypeOf(o, Function.prototype);
  if (typeof this !== 'function') {
    throw new TypeError('this is not a function');
  }
  // 没传就是 window
  const ctx = arguments[0] || window;
  // 传的必须是数组，没传就是空数组
  // arguments 不是数组，没有 slice 方法，所以要借用空数组
  const args = [].slice.call(arguments, 1);
  // 挂到 context 上，使 fn 以 context 为 this 执行。
  // 担心 context 会有重复变量名，为了不覆盖它，用 Symbol 生成一个唯一的属性名
  // 这样既不影响原对象，又能达到 apply 的目的
  const fnName = Symbol('fnName');
  ctx[fnName] = this;
  // 执行
  const result = ctx[fnName](...args);
  // 删掉挂上去的属性
  delete ctx[fnName];
  // 返回结果
  return result;
}
// 注意 bind 的特性:
// 1. 当成普通函数使用，此时 bind 生效。
// 2. 当成构造函数使用，此时 bind 无效。
Function.prototype.myBind = function (context) {
  // 要判断一下，因为有可能有这种情况:
  // const o = {};  Object.setPrototypeOf(o, Function.prototype);
  if (typeof this !== 'function') {
    throw new TypeError('this is not a function');
  }
  // 待绑定的函数
  const fToBind = this;
  // 用于绑定原型链
  const fNop = function () { };
  // 转成数组
  const outerArgs = [].slice.call(arguments, 1);
  // 返回新的绑定函数
  function fBound() {
    // 将 arguments 转成 真正的数组
    const innerArgs = [].slice.call(arguments);
    // 如果是 new，this 是以 fBound 为构造函数，创建的实例（类比于 [] instanceof Array）
    // 如果不是 new，this 一般是 window
    // 检查是不是 new，从而决定用不用外来 this (context)
    return fToBind.apply(this instanceof fBound ? this : context, outerArgs.concat(innerArgs));
  }
  // 将"待绑定函数"视为构造函数，保存它的原型链，以防后续的 new 操作
  if (fToBind.prototype) {
    fNop.prototype = fToBind.prototype;
  }
  fBound.prototype = new fNop();

  return fBound;
}
```

# fNew
## 1. 讲概念 --  new 的时候发生了什么
1. 以 构造函数的原型对象为原型，创建一个对象。
2. 以该对象为上下文，执行构造函数，同时传递实参。
3. 判断执行构造函数返回的值:
  a. 如果是一个引用类型，就返回这个引用。
  b. 如果不是引用类型，返回创建的对象。
## 手写new
```js
// constructor: new的目标函数，也就是构造函数
function _new(constructor, ...args) {
  // 注意健壮性
  if (Object.prototype.toString.call(constructor) !== '[object Function]') {
    console.error('第一个参数请传入函数');
    return;
  }
	// 创建一个继承构造函数原型的对象，即将把它作为构造函数的执行背景。
  const context = Object.create(constructor.prototype);
  // 以该对象为this，执行构造函数
  // 构造函数往往会有this.name = name之类的语句，也就是说这一步在填充对象。
  const result = constructor.apply(context, args);
  // 如果有执行结果，返回执行结果；如果没有，返回该对象。
  return (typeof result === 'object' && result !== null) ? result : context;
}
```
### 手写以后的追问
1. 为什么不用 Object.setPrototypeOf 来修改原型？
mdn上介绍过，由于现代 JavaScript 引擎优化属性访问所带来的特性的关系，更改对象的原型在各个浏览器和 JavaScript 引擎上都是一个很慢的操作，如果开发者关心性能，应该避免设置一个对象的原型。相反，应该使用 Object.create() 来创建带有您想要的原型的新对象。
2. 为什么源码里有很多 const o = Object.create(null) ，不能直接 const o = {} 吗？
Object.create(null)可以创建一个纯净的对象，对象上没有从 Object.prototype 继承来的属性。

# f垃圾回收
## 1.讲概念
JavaScript在创建变量时自动进行了分配内存，并且在不使用它们时“自动”释放。 释放的过程称为垃圾回收。
垃圾回收算法主要依赖于`引用`的概念。在内存管理的环境中，一个对象如果有访问另一个对象的权限，不管是隐式还是显式的，都叫做一个对象引用另一个对象。例如，一个 `Javascript`对象具有对它原型的引用，这是隐式引用，还有对它属性的引用，这是显式引用。
## 2.说用途
浏览器的垃圾回收算法主要有两种 ——  引用计数 和 标记清除。
### 引用计数
这个是最初级的垃圾收集算法，它的理念是: 把 `对象是否不再需要` 简化定义为 `对象有没有其他对象引用到它`。如果没有`引用`指向该对象，对象将被垃圾回收机制回收。
#### 引用计数的限制 -- 循环引用
`引用计数`无法处理`循环引用`的情况。比如在一个函数中，两个对象被创建，并互相引用，形成了一个循环。它们被调用之后会离开函数作用域，所以它们已经没有用了，可以被回收了。然而，引用计数算法考虑到它们互相都有至少一次引用，所以它们不会被回收。
### 标记清除
这个算法把`对象是否不再需要`简化定义为`对象是否可以获得`。
这个算法假定设置一个叫做根（root）的对象（在Javascript里，根是全局对象）。垃圾回收器将定期从根开始，找所有从根开始引用的对象，然后找这些对象引用的对象……。从根开始，垃圾回收器将找到所有可以获得的对象和收集所有不能获得的对象，`不能获取的对象`视为垃圾数据，它们所占的内存就可以回收了。
#### 标记清除 解决 循环引用
`标记清除`可以有效解决`循环引用`的问题: 从全局对象触发，无法获取互相引用的两个对象，因此，他们将会被垃圾回收器回收。


# f箭头函数
## 1.讲概念
箭头函数表达式的语法比函数表达式更简洁，并且没有自己的this, arguments, super 还有 new.target。
箭头函数表达式更适用于那些本来需要匿名函数的地方，并且它不能用作构造函数。 (因为它没有 constructor，也就是构造器)
## 2.注意点
### 没有 this
箭头函数不会创建自己的`this`,它只会从自己的作用域链的上一层继承`this`。
由于箭头函数没有自己的`this`指针，通过 call 或 apply 方法调用一个函数时，第一个参数会被忽略，第二个往后的参数才会生效。
```js
function Person(){
  this.age = 0;
  setInterval(() => {
    this.age++; // |this| 正确地指向 p 实例
  }, 1000);
}
var p = new Person();
```
### 没有 arguments
### new 一个箭头函数会报错
箭头函数不能用作构造器，和 new一起用会抛出错误。
```js
var Foo = () => {};
var foo = new Foo(); // TypeError: Foo is not a constructor
```
### 没有 prototype
箭头函数没有prototype属性。
```js
var Foo = () => {};
console.log(Foo.prototype); // undefined
```

# f数据类型
JavaScript 语言中数据类型集合由原始值和对象组成。
## 原始值（直接表示在语言底层的不可变数据）
布尔类型
Null 类型
Undefined 类型
Number 类型
BigInt 类型
String 类型
Symbol 类型
## 对象（一组属性的集合）
函数、对象

# f判断数据类型
## 方法一: typeof
typeof 操作符返回一个字符串，表示操作数的类型。
### typeof 缺点
1. 对 Object/Array/Map/Set/Null 都是返回 "object"，无法进一步细分类型。
2. `typeof null` 是 "object"，让人疑惑，这是一个历史原因:
在 JavaScript 最初的实现中，JavaScript 中的`值`是用`表示类型的标签`和`实际数据值`表示的。它用一个`32bit`的数据存储，其中用了 `3个bit` 来存储类型，`对象`的类型是 `000`。而由于`null`代表的是空指针，值为`0x00`，所以 `null`的类型标签也是`000`，所以 `null` 也被认为是一个 `对象`，`typeof null` 也就返回 "object"。
## 方法二: Object.prototype.toString.call
这个比较准确。可以使用 Object.prototype.toString.call 做细分判断，它同样返回一个字符串，值为 "[object Constructor]"
## 方法三: instanceof
instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
### instanceof 缺点
1. 如果表达式 obj instanceof Foo 返回 true，则并不意味着该表达式会永远返回 true，因为 Foo.prototype 属性的值有可能会改变，改变之后的值很有可能不存在于 obj 的原型链上，这时原表达式的值就会成为 false。
2. 另外一种情况下，原表达式的值也会改变，就是改变对象 obj 的原型链的情况，虽然在目前的ES规范中，我们只能读取对象的原型而不能改变它，但借助于非标准的 __proto__ 伪属性，是可以实现的。比如执行 obj.__proto__ = {} 之后，obj instanceof Foo 就会返回 false 了。
3. 在浏览器中，我们的脚本可能需要在多个窗口之间进行交互。多个窗口意味着多个全局环境，不同的全局环境拥有不同的全局对象，从而拥有不同的内置类型构造函数。这可能会引发一些问题。比如，表达式 [] instanceof window.frames[0].Array 会返回 false，因为 Array.prototype !== window.frames[0].Array.prototype，并且数组从前者继承。


# ffor..in  遍历key
## 1.讲概念
`for...in`语句迭代一个对象的除`Symbol`以外的`可枚举属性`，包括`继承`的可枚举属性。 (通过 `object.hasOwnProperty` 只遍历自身属性)
## 2.说用途
`for...in`是为遍历对象属性而构建的，不建议与数组一起使用，数组可以用`Array.prototype.forEach`和`for...of`。
`for...in`最常用的地方应该是用于调试，可以更方便的去检查对象属性（通过输出到控制台或其他方式）。尽管对于处理存储数据，数组更实用些，但是你在处理有key-value数据（比如属性用作“键”），需要检查其中的任何键是否为某值的情况时，还是推荐用`for...in`。

# ffor..in 和 for..of 的区别
无论是for...in还是for...of语句都是迭代一些东西。它们之间的主要区别在于它们的迭代方式。
1. 一个是 `key`，一个是 `value`。
* for...in 语句迭代对象除`Symbol`外的可`枚举属性`。
* for...of 语句遍历可迭代对象定义要迭代的数据。
2. 访问原型链
* `for..in` 会把从原型链上继承的`可枚举属性`也遍历出来
* `for..of` 是按对象`实现的/内置的`迭代接口来遍历，一般不会遍历到原型链上的值。

# ffor..of  遍历value
## 1.讲概念
`for...of`语句在`可迭代对象`上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的`值`执行语句.
`可迭代对象`包括 Array，Map，Set，String，TypedArray，arguments 对象等。
```js
// 迭代map例子
const map = new Map([["a", 1], ["b", 2], ["c", 3]]);
for (const entry of map) {
  console.log(entry);
}
// ["a", 1]
// ["b", 2]
// ["c", 3]
```
## 2.说用途
实现迭代接口[Symbol.iterator]，自定义被迭代的数据。
```js
const iterable = {
  [Symbol.iterator]() {
    return {
      i: 0,
      next() {
        return  this.i < 3 ? { value: this.i++, done: false } : { value: undefined, done: true };
      }
    };
  }
};
for (const value of iterable) {
  console.log(value);
}
// 0
// 1
// 2
```

# fmap
## 1.讲概念
map 方法`创建一个新数组`，这个新数组由原数组中的`每个元素都调用一次提供的函数`后的返回值组成。
map 方法会给原数组中的每个元素都按顺序调用一次 callback 函数。callback 每次执行后的返回值（包括 undefined）组合起来形成一个新数组。 callback 函数只会在`有值的索引`上被调用；那些`从来没被赋过值`或者`使用 delete 删除的索引`则不会被调用。
## 2.说用途
因为map`生成一个新数组`，当你不打算使用返回的新数组却使用map是违背设计初衷的，请用`forEach`或者`for-of`替代。
## 3.注意点
map 方法`处理数组元素的范围是在 callback 方法第一次调用之前就已经确定了`。调用map方法之后追加的数组元素`不会被callback访问`。如果存在的数组元素改变了，那么传给callback的值是map访问该元素时的值。在map函数调用后但在访问该元素前，该元素被删除的话，则无法被访问到。

# fforEach
## 1.讲概念
forEach 方法对数组的每个元素执行一次给定的函数。
forEach 方法按升序为数组中含有效值的每一项执行一次 callback 函数，那些已删除或者未初始化的项将被跳过（例如在稀疏数组上）。
forEach 遍历的范围在第一次调用 callback 前就会确定。调用 forEach 后添加到数组中的项不会被 callback 访问到。如果已经存在的值被改变，则传递给 callback 的值是 forEach 遍历到他们那一刻的值。
已删除的项不会被遍历到，如果已访问的元素在迭代时被删除了，比如使用 shift，之后的元素将被跳过。
## 2.注意点
除了抛出异常以外，没有办法中止或跳出 forEach循环。如果你需要中止或跳出循环，forEach() 方法不是应当使用的工具。
若你需要提前终止循环，你可以使用：every/some/find/findIndex。

# 如何跳出 map 或 forEach 循环
map 和 forEach 不能被中断: 一旦开始就不能 break，如果想中途跳出循环，可以在遍历的外层加一个 try...catch，然后中途 throw 一个 Error。
```js
const a = [1,2,3,4,5,6];
try {
  a.forEach(v => {
    if (v === 3) {
      throw new Error('break');
      // break;  // Uncaught SyntaxError: Illegal break statement
    }
    console.log(v);
  })
} catch(e) {
  console.error(e);
}
```

# f深拷贝
拷贝对象分为两种情况，一种是`浅拷贝`，一种是`深拷贝`。
## 浅拷贝
`浅拷贝`指的是简单地将一个对象的属性值复制到另一个对象，如果有的属性的值为`引用`类型的话，那么会将这个引用的地址复制给对象，因此两个对象会有同一个引用类型的引用。
### 实现
浅拷贝可以使用 `Object.assign` 和 `展开语法` 来实现。
### 缺点
如果拷贝的是引用类型，拷贝之后的对象引用会影响到原始对象。
```js
const obj = {
  inObj: {a: 1, b: 2}
}
const clone = {...obj}   // 或  Object.assign({}, obj);
clone.inObj.a = 2;   // 原始对象也变了
console.log(obj) // {inObj: {a: 2, b: 2}}
```
## 深拷贝
为了解决`浅拷贝对象的引用影响原始对象`的问题，我们可以使用`深拷贝`的方式。
深拷贝相对浅拷贝而言，如果遇到属性值为引用类型的时候，它`新建一个引用类型`并将对应的值复制给它，因此对象获得的一个新的引用类型而不是一个原有类型的引
用。
### 实现
1. 可以用 JSON 的两个 api: `JSON.parse(JSON.stringify())` 实现深拷贝，但是由于 JSON 的对象格式比 js 的对象格式更加严格，所以如果属性值里边出现函数或者 Symbol 类型的值时，会转换失败。
```js
const o = { fn: function() {}, [Symbol.for('react')]: "我是Symbol值" };
const clone = JSON.parse(JSON.stringify(o));
console.log(clone);  // {}
```
#### 2. 递归
针对 `JSON` 的问题，可以用 `递归` 实现深拷贝，具体的思路是:
遍历原始对象自身的属性，如果是原始类型直接复制，如果是引用类型，则递归地调用`深拷贝`函数，区分不同类型的对象进行处理，然后进行拷贝。
#### 简单版
```js
function deepCopy(object) {
  if (!object || typeof object !== "object") return object;

  const newObject = Array.isArray(object) ? [] : {};

  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      newObject[key] =
        typeof object[key] === "object" ? deepCopy(object[key]) : object[key];
    }
  }

  return newObject;
}
```
#### 全面版 TODO
拷贝对象的所有属性
遍历属性，根据属性值:
1. 对象: 递归(根据构造函数，新建不同对象、处理，返回)
2. 非对象: 拷贝原对象的属性值
```js
function isObject(obj) {
  return typeof obj === "object" && obj !== null;
}

export function cloneDeep(data, hash = new WeakMap()) {
  if (!isObject(data) || !data || !data.constructor) {
    return data
  }
  let copyData   // 存储各种类型的对象
  const Constructor = data.constructor
  switch (Constructor) {
    case RegExp:
      // 正则表达式: 用原数据新建一个正则对象  new RegExp(...原正则数据) 
      copyData = new Constructor(data)
      break
    case Date:
      // Date: 用时间戳新建一个 Date 对象
      copyData = new Constructor(data.getTime())
      break
    default:
      // 解决循环引用  (obj.circle = obj)
      // 如果遇到过这个引用，返回之前拷贝好的引用s
      // 最原始对象的引用，也在 hash 里
      if (hash.has(data)) {
        return hash.get(data)
      }
      copyData = new Constructor()
      if (Constructor === Map) {
        data.forEach((value, key) => {
          // 原始 Map 的元素，一个一个加入到 拷贝的 Map 中
          copyData.set(key, isObject(value) ? cloneDeep(value) : value)
        })
      }
      if (Constructor === Set) {
        data.forEach(value => {
          // 原始 Set 的元素，一个一个加入到 拷贝的 Set 中
          copyData.add(isObject(value) ? cloneDeep(value) : value)
        })
      }
      // 拷贝过的引用都记录一下
      // WeakMap弱引用，不计入GC的引用中，不干扰垃圾回收的判断
      hash.set(data, copyData)
  }

  // 解决 for..in 不能遍历 Symbol 属性的问题
  const symbols = Object.getOwnPropertySymbols(data)
  if (symbols && symbols.length) {
    symbols.forEach(symkey => {
      copyData[symkey] = isObject(data[symkey]) ? cloneDeep(data[symkey], hash) : data[symkey]
    })
  }
  // 遍历基本属性
  for (var key in data) {
    copyData[key] = isObject(data[key]) ? cloneDeep(data[key], hash) : data[key]
  }
  // 拷贝完成✅
  return copyData
}
```
