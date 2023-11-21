/*
  Given swim yards in the following format:

   200 paddle pull
   400 free
   100 cooldown

  Will return the total yardage
*/
function calculateSwimYardageForSelection() {
  // Access the active Google Document
  var doc = DocumentApp.getActiveDocument();
  var selection = doc.getSelection();

  // Check if there is a selection
  if (!selection) {
    DocumentApp.getUi().alert('Please select some text.');
    return;
  }

  var elements = selection.getRangeElements();
  var totalYardage = 0;

  // Regular expression to match yardage and activity
  var regex = /(\d+)\s[\w\s]+/g;

  // Loop through all selected elements
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    // Check if the element is a text element
    if (element.getElement().editAsText) {
      var text = element.getElement().editAsText().getText();
      var match;

      // Extract and sum yardage values
      while ((match = regex.exec(text)) !== null) {
        var yardage = parseInt(match[1], 10);
        totalYardage += yardage;
      }
    }
  }

  // Display the result
  DocumentApp.getUi().alert('Total Swim Yardage for Selection: ' + totalYardage);
}

// Add a custom menu to the Google Doc to run the script for a selection
function onOpen() {
  var ui = DocumentApp.getUi();
  ui.createMenu('Exercise Tools')
    .addItem('Calculate Yardage for Selection', 'calculateSwimYardageForSelection')
    .addToUi();
}
