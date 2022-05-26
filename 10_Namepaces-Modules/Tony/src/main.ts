// 동적 임포트 방법 1
// const { hi, bye } = await import('./locale');
export {} // make this file module
// 참고 : https://ko.javascript.info/modules-dynamic-imports

// 동적 임포트 방법 2
import { locale } from './locale';

async function main() {
  const path = './locale.js'
  const localeModule = await import(path);
  const localeFunction: typeof locale = localeModule.locale;
  console.log(localeFunction('Korea'));
}

main();