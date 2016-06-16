# Translation
Javascript API to translate text using Google's App Script

### Set Up

 - Go to the app script [homepage](https://developers.google.com/apps-script/) for information on how to use scripts
 - Insert `Code.gs` into your project
 - Deploy as a web application and enjoy free translation

### Request Parameters

 - `text` The text to be translated.
 - `source` The source language, `auto` to automatically detect.
 - `targets` The target languages, separated by commas.

#### Response Parameters

 - `success` Whether or not the translation was successful.
 - `error` If not successful, the error message.
 - `translations` If successful, the map of `source` to the translated text.

### Example

```
Request: api.com/translate?text=love&source=en&targets=es,fr,de

Response: {
  "success": true,
  "error": null,
  "translations": {
    "es": "amor",
    "fr": "amour",
    "de": "Liebe"
  }
}
```

### Future
I hope to create lightweight APIs in other languages (Java, Ruby, Swift, Python). You could help by making a pull request.
