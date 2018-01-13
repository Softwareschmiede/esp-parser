const ESPParser = require('../index');

const buf = Buffer.from('55000a0701eba5000088080181383f0003ffffffff4f0018', 'hex');

const packet = new ESPParser(buf);

console.log(packet);