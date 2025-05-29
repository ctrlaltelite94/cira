export const GenerateStationCode = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randomLetters = () => letters.charAt(Math.floor(Math.random() * letters.length));
    const randomDigits = () => Math.floor(100 + Math.random() * 900); // 3-digit number
  
    return `${randomLetters()}${randomLetters()}-${randomDigits()}`;
};
  