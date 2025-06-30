const QRCode = require('qrcode');

const generateQRCode = async (data) => {
  try {
    return await QRCode.toDataURL(data);
  } catch (err) {
    throw new Error('QR code generation failed');
  }
};

module.exports = generateQRCode; 