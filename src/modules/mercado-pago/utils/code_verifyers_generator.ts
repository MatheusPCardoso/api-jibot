import * as crypto from 'crypto'

export function generateCodeVerifier(length: number = 64): string {
  if (length < 43 || length > 128) {
    throw new Error(
      'O comprimento do code_verifier deve estar entre 43 e 128 caracteres.',
    )
  }

  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const numbers = '0123456789'
  const specials = '-._~'
  const allowedChars = uppercase + lowercase + numbers + specials

  let codeVerifier = ''

  if (typeof crypto !== 'undefined' && crypto.randomBytes) {
    const randomBytes = crypto.randomBytes(length)
    for (let i = 0; i < length; i++) {
      codeVerifier += allowedChars[randomBytes[i] % allowedChars.length]
    }
  } else if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const randomValues = new Uint32Array(length)
    crypto.getRandomValues(randomValues)
    for (let i = 0; i < length; i++) {
      codeVerifier += allowedChars[randomValues[i] % allowedChars.length]
    }
  } else {
    throw new Error(
      'Nenhum método seguro de geração aleatória disponível (use Node.js ou um navegador moderno).',
    )
  }

  return codeVerifier
}
