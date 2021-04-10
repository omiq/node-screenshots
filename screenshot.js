const puppeteer = require('puppeteer');

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

(async() => {
    var args = require('minimist')(process.argv.slice(2));
    console.log(args._[0]);
    console.log(args._[1]);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    process.on('unhandledRejection', (reason, p) => {
        console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
        browser.close();
      });

    await page.setViewport({width: 1280, height: 800})
    await page.goto('https://retrogamecoders.com/c64-emulator/?'+args._[0], {  waitUntil: 'networkidle2',}); // wait lack of network
    await timeout(30000);
    await page.screenshot({path: 'public/'+args._[1]});

    var output = await page.evaluate(() => {
        return;
      });

    await browser.close();

})();
