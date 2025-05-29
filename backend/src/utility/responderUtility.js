export const GenerateStationCode = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomLetters = () => letters.charAt(Math.floor(Math.random() * letters.length));
    const randomDigits = () => Math.floor(100 + Math.random() * 900); // 3-digit number
  
    return `${randomLetters()}${randomLetters()}-${randomDigits()}`;
};
  

export const generateReferenceNumber = () => {
    const random = Math.random().toString(36).substr(2, 4).toUpperCase(); // 4 alphanumeric chars
    const timestamp = Date.now().toString().slice(-2); // last 2 digits of timestamp
    return `I${random}${timestamp}`;
  };
  