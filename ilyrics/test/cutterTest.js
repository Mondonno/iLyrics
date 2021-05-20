const ICustomizer = require("../src/modules/helpers/ICustomizer");
const customizer = new ICustomizer();

const m = async () => {
    let c = customizer.customize("wtf <haha, ha, h, <cool>> kekw", "lol (with cutomizer)");
    console.log(await c);
}
m();
