# esp-parser
This module parses esp3 buffer to esp3 packetes.
It extracts all information out of the buffer, except of the "user data".

## Usage
```javascript
const ESPParser = require('esp-parser');
...
const packet = new ESPParser(buffer);
```

## Packet structure
```javascript
{
    raw: Buffer,
    syncByte: '55',
    rawHeader: Buffer,
    header: {
        dataLength: Number,
        optionalLength: Number,
        packetType: String
    },
    crc8h: String,
    rawData: Buffer,
    data: {
        rorg: String,
        rawUserData: Buffer,
        senderId: String,
        status: String
    },
    rawOptionalData: Buffer,
    optionalData: {
        subTelNum: Number,
        destinationId: String,
        dBm: Number,
        securityLevel: Number
    },
    crc8d: String
}
  ```