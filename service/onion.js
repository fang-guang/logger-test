
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

// conpose方法实现
function compose(middleware) {
  return function (ctx, next) {
    function onion(i) {
      let fn = middleware[i];
      // 此时next为middleware[middleware.length + 1]为undefined
      if (i === middleware.length) {
        fn = next;
      }
      if (!fn) {
        return Promise.resolve();
      }
      return Promise.resolve(fn(ctx, onion.bind(null, i + 1)));
    }
    return onion(0);
  };
}

useP(f1);
useP (f2);

compose(middleware)();
