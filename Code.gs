/**
 * Simple translation API for free of use.
 *
 * Created by Electroid.
 */
function doGet(e) {
  var request = e.parameter
  
  var text = request['text']
  var source = request['source']
  var targets = request['targets']
  
  if(targets != null) {
    targets = targets.split(',')
  }
  
  var response = translate(text, source, targets)
  
  return HtmlService.createHtmlOutput(JSON.stringify(response))
}

/**
 * Translate a text from a source language to multiple target languages.
 *
 * @param {string} text The text to translate, non-empty.
 * @param {string} source The source language of the text or 'auto' if unknown.
 * @param {Array.<string>} targets The target languages to translate the text to.
 *
 * @returns {Object} A response object with a success boolean, an error message,
 *                   and a map of target language to translation. If success is false,
 *                   there will be an error message and translations will be null. If
 *                   success if true, the error message will be null and the translations
 *                   will be present.
 */
function translate(text, source, targets) {
  
  var success = true
  var error = null
  var translations = {}
  
  try {
    
    validate('text', text)
    validate('source', source)
    validate('targets', targets)
    
    for(i in targets) {
      translations[targets[i]] = _translate(text, source, targets[i])
    }
  } catch(e) {
    success = false
    error = e.toString()
    translations = null
  }
  
  return {
    'success': success,
    'error': error,
    'translations': translations
  }
}

/**
 * Translate text from one language to another.
 *
 * @param {string} text The string to translate, non null.
 * @param {string} source The language of the text, automatically calculated if null or empty.
 * @param {string} target The language to translate the text to, non null.
 * 
 * @throws {exception} If the source or target language is invalid.
 * @return {string} The translated text in the target language.
 */
function _translate(text, source, target) {
  
  if(source == 'auto') {
    source = ''
  }
  
  return LanguageApp.translate(text, source, target)
}

/**
 * Validate that an argument is present and non-empty.
 *
 * @param {string} name The name of the argument, non null.
 * @param {Object} object The object to validate.
 *
 * @throws {exception} If the object is invalid.
 */
function validate(name, object) {
  var valid = true
  var error = 'Invalid argument: ' + name + ' '
  
  var string = typeof object == 'string'
  var array = Array.isArray(object)
  
  if(object == null) {
    error += 'cannot be null'
    valid = false
  } else if((string && object.trim().length == 0) || (array && object.length == 0)) {
    error += 'cannot be empty'
    valid = false
  } else if(array && object.length >= 1) {
    for(i in object) {
      error += '(inside array) '
      validate(name, object[i])
    }
  }
  
  if(!valid) {
    throw error
  }
}
