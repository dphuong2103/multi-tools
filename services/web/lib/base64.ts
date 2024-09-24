export function encodeBase64(input: string) {
    return window.btoa(input)
}

export function decodeBase64(input: string) {
    return window.atob(input)
}