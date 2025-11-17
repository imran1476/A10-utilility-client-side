export function validatePassword(pw){
const hasUpper = /[A-Z]/.test(pw)
const hasLower = /[a-z]/.test(pw)
const minLen = pw.length >= 6
return { valid: hasUpper && hasLower && minLen, hasUpper, hasLower, minLen }
}