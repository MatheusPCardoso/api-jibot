export const domainGenerator = () => {
  if (process.env.OVERRIDE_DOMAIN) return process.env.OVERRIDE_DOMAIN
  return '.jibot.com.br'
}
