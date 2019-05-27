const fs = require('fs')
const { google } = require('googleapis')
const readline = require('readline-sync')

async function getToken ({ accessType, client, scope, tokenPath }) {
  if (fs.existsSync(tokenPath)) {
    const token = JSON.parse(fs.readFileSync(tokenPath, 'utf-8'))
    return token
  } else {
    const token = await getNewToken({ accessType, client, scope })
    fs.writeFileSync(tokenPath, JSON.stringify(token))
    return token
  }
}

async function getAuth ({
  accessType,
  clientId,
  clientSecret,
  redirectUris,
  scope,
  tokenPath
}) {
  const client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUris[0]
  )

  const token = await getToken({ accessType, client, scope, tokenPath })
  client.setCredentials(token)
  return client
}

async function getNewToken ({ accessType, client, scope }) {
  const authUrl = client.generateAuthUrl({
    accessType,
    scope
  })

  console.info('Authorize this app by visiting this url:', authUrl)
  const code = readline.question('Enter the code from that page here: ')
  const { tokens } = await client.getToken(code)
  return tokens
}

module.exports = {
  getAuth
}
