# Gridsome Source for Google Docs

Source plugin for fetching data into [Gridsome](https://gridsome.org/) from Google Docs.

## Install

`npm install --save gridsome-source-google-docs`

## How to use

```javascript
// In your gridsome.config.js
plugins: [
  {
    use: 'gridsome-source-google-docs',
    options: {
      foldersIds: ['a8o3d384gdjbvxlfdi8rsz3'],
      clientId: '534534534553-sdify73yriw3sy3ri7y33fis73yfis.apps.googleusercontent.com',
      clientSecret: 'fsidufhsie734fhsi7si3',
      apiKey: 'asdas7ir3irshek8hsduska3udhsdu',
    },
  }
]
```

## How to query and filter

You can query the nodes created from Google Drive with the following:

```javascript
query IndexQuery {
  posts: allGoogleDocs {
    edges {
      node {
        date
        title
        body
        slug
        id
        content
      }
    }
  }
}
```
