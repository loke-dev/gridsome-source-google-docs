# Gridsome Source for Google Docs

Source plugin for fetching data into [Gridsome](https://gridsome.org/) from Google Docs.

## Install

`npm install --save gridsome-source-google-docs`

## Turn on the Google Docs API and set configuration

-   Follow the [Step 1: Turn ON the Google Docs API](https://developers.google.com/docs/api/quickstart/js)
-   Turn ON the [Google Drive API](https://developers.google.com/drive/api/v3/quickstart/nodejs)
-   Get a `Client ID` and a `Client Secret` from the Google console. If you downloaded `credential.json` file, you can extract them from it
-   Get an `API key` from the Google console
-   Fill the `gridsome-source-google-docs` gridsome options object.

> More info can be found [on the official Google Docs quickstart guide](https://developers.google.com/docs/api/quickstart/js).

## Generate a token file

Run `gridsome develop` and follow the instructions to generate a token file.

> `tokenPath` can be customized in the options object to change the location and name.


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
