const sharp = require('sharp');

async function cropImage(imageBase64, width, height) {
    try {
        const buffer = Buffer.from(imageBase64, 'base64');

        const croppedBuffer = await sharp(buffer)
            .resize(width, height) 
            .toBuffer(); 

        const croppedImageBase64 = croppedBuffer.toString('base64');
        return croppedImageBase64;
    } catch (error) {
        console.error('Error cropping image:', error);
        throw error;
    }
}

module.exports.handler = async function (event, context) {
    return {
        content: await cropImage(event.content, event.width, event.height)
    };
};

