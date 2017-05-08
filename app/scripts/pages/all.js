//JAVASCRIPT APPLIED TO ALL PAGES
//THIS SHOULD CONTAIN ANY ELEMENTS/COMPONENTS USED ACROSS MULTIPLE PAGES

// IIFE - Immediately Invoked Function Expression
(function($, window, document) {

  // The $ is now locally scoped

 // Listen for the jQuery ready event on the document
 $(function() {

   // The DOM is ready!
   console.log('The DOM is ready!');

 });

 // The rest of code goes here!
  console.log('The DOM may not be ready!');

}(window.jQuery, window, document));
