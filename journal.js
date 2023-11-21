/*
 * I have a journal where I add entries at the top. I wanted to turn prior
 * entries to a light gray color so that I am not distracted by them. So I run
 * this script on a daily trigger to make the previous entries lighter.
 * Just need to leave some space at the top of the document to keep the
 * text at the top black.
 */

function setAllTextToLightGray() {
  // Get the active document
  const doc = DocumentApp.getActiveDocument()

  // Get the body of the document
  const body = doc.getBody()

  // Define light gray color code
  const lightGray = '#ebebeb'

  // Get all the text elements in the body
  const textElements = body.getParagraphs()

  // Flag to indicate if first non-whitespace character is found
  let foundFirstNonWhitespace = false

  // Loop through each text element to update the color
  textElements.forEach(element => {
    const text = element.editAsText()
    const currentColor = text.getForegroundColor()

    // Check if we have found our first non-whitespace text
    if (!foundFirstNonWhitespace && text.getText().trim() !== '') {
      foundFirstNonWhitespace = true
    }

    // Only update elements from the first non-whitespace element onwards
    if (foundFirstNonWhitespace) {
      // Skip the element if it's already this shade of gray
      if (currentColor === lightGray) {
        return
      }

      // Set the foreground color to light gray
      text.setForegroundColor(lightGray)
    }
  })
}

