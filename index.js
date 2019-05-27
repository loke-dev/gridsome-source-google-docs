const { getAuth } = require('./utils/auth')
const { fetchGoogleDriveFiles } = require('./utils/google-drive')
const { fetchGoogleDocsDocuments } = require('./utils/google-docs')

class GoogleDocsSource {
  static defaultOptions () {
    return {
      typeName: 'GoogleDocs',
      accessType: 'offline',
      redirectUris: ['urn:ietf:wg:oauth:2.0:oob', 'http://localhost'],
      scope: [
        'https://www.googleapis.com/auth/documents.readonly',
        'https://www.googleapis.com/auth/drive.metadata.readonly'
      ],
      tokenPath: 'google-docs-token.json',
      numNodes: 10,
      fields: ['createdTime'],
      fieldsMapper: { createdTime: 'date', name: 'title' },
      fieldsDefault: { draft: false }
    }
  }

  constructor (api, options) {
    api.loadSource(async store => {
      await this.createNodes(options, store)
    })
  }

  async fetchDocuments (options) {
    if (!options.apiKey) {
      throw new Error('source-google-docs: Missing API key')
    }

    if (!options.clientId) {
      throw new Error('source-google-docs: Missing client id')
    }

    if (!options.clientSecret) {
      throw new Error('source-google-docs: Missing client secret')
    }

    if (!options.foldersIds) {
      throw new Error('source-google-docs: Missing folders ids')
    }

    const auth = await getAuth({
      ...options
    })

    const googleDriveFiles = await fetchGoogleDriveFiles({
      auth,
      rootFolderIds: options.foldersIds,
      fields: options.fields,
      fieldsMapper: options.fieldsMapper,
      fieldsDefault: options.fieldsDefault
    })

    return await fetchGoogleDocsDocuments({
      auth,
      apiKey: options.apiKey,
      googleDriveFiles
    })
  }

  async createNodes (options, { addContentType, slugify }) {
    const documents = await this.fetchDocuments(options)

    const contentType = addContentType({
      typeName: options.typeName
    })

    const collection = []

    documents.forEach(document => {
      console.log(document)
      collection.push({
        id: document.id,
        date: document.date,
        title: document.title,
        body: document.markdown,
        content: JSON.stringify(document.content),
        slug: slugify(document.title)
      })
    })

    collection.forEach(item => contentType.addNode(item))
  }
}

module.exports = GoogleDocsSource
