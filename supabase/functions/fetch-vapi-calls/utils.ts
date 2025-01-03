export const isValidUUID = (uuid: string) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(uuid)
}

export const validateVapiKey = () => {
  const vapiKey = Deno.env.get('VAPI_API_KEY')
  if (!vapiKey) {
    console.error('VAPI API key not found in environment variables')
    throw new Error('VAPI API key not configured')
  }
  return vapiKey
}