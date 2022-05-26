async function main() {
    const path = './locale.js';
    const localeModule = await import(path);
    const localeFunction = localeModule.locale;
    console.log(localeFunction('Korea'));
}
main();
export {};
