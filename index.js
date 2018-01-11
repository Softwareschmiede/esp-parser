'use strict';

class ESPParser {
    constructor(buf) {
        if (buf === undefined || buf === null) {
            throw new TypeError('Buffer is missing');
        }

        const dataOffset = 6; // Header has a length of 5 bytes + 1 byte crc8 checksum

        // Sync Byte - Every ESP3 packet starts with 55
        const syncByte = buf.toString('hex', 0, 1); // Size = 1 Byte

        const rawHeader = buf.slice(1, 5); // Header size = 4

        const header = {
            dataLength: rawHeader.readUInt16BE(0), // Size = 2 bytes
            optionalLength: rawHeader.readUInt8(2), // Size = 1 byte
            packetType: rawHeader.toString('hex', 3, 4) // Size = 1 byte
        };

        const crc8h = buf.toString('hex', 5, 6); // Size = 1 byte

        const rawData = buf.slice(dataOffset, dataOffset + header.dataLength); // Keep buffer reference

        const data = {
            rorg: rawData.toString('hex', 0, 1), // Size = 1 byte
            rawUserData: rawData.slice(1, header.dataLength - 5), // Variable length, but sender id and status have fixed sizes
            senderId: rawData.toString('hex', header.dataLength - 5, header.dataLength - 1), // Size = 4 bytes
            status: rawData.toString('hex', header.dataLength - 1, header.dataLength) // Size = 1 byte
        };

        const rawOptionalData = buf.slice(dataOffset + header.dataLength, dataOffset + header.dataLength + header.optionalLength); // Keep buffer reference

        const optionalData = {
            subTelNum: rawOptionalData.readUInt8(0), // Size = 1 byte
            destinationId: rawOptionalData.toString('hex', 1, 5), // Size = 4 bytes
            dBm: rawOptionalData.readUInt8(5), // Size = 1 byte
            securityLevel: rawOptionalData.readUInt8(6) // Size = 1 byte
        };

        const crc8d = buf.toString('hex', dataOffset + header.dataLength + header.optionalLength, dataOffset + header.dataLength + header.optionalLength + 1); // Size = 1 byte


        return {
            raw: buf,
            syncByte: syncByte,
            rawHeader: rawHeader,
            header: header,
            crc8h: crc8h,
            rawData: rawData,
            data: data,
            rawOptionalData: rawOptionalData,
            optionalData: optionalData,
            crc8d: crc8d
        }
    }
}

module.exports = ESPParser;