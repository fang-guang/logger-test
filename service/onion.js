
const f1 = async function (ctx, next) {
  console.log(1);
  await next();
  console.log(2);
};
const f2 = async function (ctx, next) {
  console.log(11);
  await next();
  console.log(22);
};

const middleware = [];

// use功能实现
const useP = function(fn) {
  if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
  middleware.push(fn);
  return middleware;
}

// middleware 中间件函数数组, 数组中是一个个的中间件函数
function compose (middleware) { 
  return function (context, next) { // 调用compose函数会返回一个函数
    let index = -1
    return dispatch(0) // 启动middleware数组中的第一个函数的执行
    function dispatch (i) {
      index = i
      let fn = middleware[i]
      if (i === middleware.length) {
        fn = next
      }
      if (!fn) return Promise.resolve()
      // 这里执行middleware数组函数
      return Promise.resolve(fn(context, function next () { 
        return dispatch(i + 1)  // 执行下一个中间件函数
      }))
    }
  }
}

useP(f1);
useP (f2);

compose(middleware)();
