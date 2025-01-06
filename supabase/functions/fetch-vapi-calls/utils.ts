export const validateVapiKey = () => {
  const vapiKey = Deno.env.get('VAPI_API_KEY')
  if (!vapiKey) {
    throw new Error('VAPI API key not found in environment variables')
  }
  return vapiKey
}

export const isValidUUID = (str: string) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(str)
}