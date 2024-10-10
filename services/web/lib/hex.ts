export function encodeHex(input: string) {
  let hex = "";

  for (let i = 0; i < input.length; i++) {
    const charCode = input.charCodeAt(i).toString(16);
    hex += charCode.padStart(2, "0");
    if (i < input.length - 1) {
      hex += " ";
    }
  }

  return hex;
}

export function decodeHex(input: string) {
  input = input.replace(/\s/g, "");
  let str = "";

  for (let i = 0; i < input.length; i += 2) {
    const hexChar = input.substr(i, 2);
    const charCode = parseInt(hexChar, 16);
    str += String.fromCharCode(charCode);
  }

  return str;
}

export function isValidHex(input: string): boolean {
  input = input.replaceAll(" ", "");
  return /^[0-9a-fA-F]*$/.test(input) && input.length % 2 === 0;
}

export function isValidUrl(input: string) {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i",
  ); // validate fragment locator
  return !!urlPattern.test(input);
}
