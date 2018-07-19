$(function() {
  //the following will run the function populateButtons to populate th buttonArea with the search array and with buttons
  populateButtons(searchArray, 'searchButton', '#buttonsArea');

  //test to make sure JS is loading
  console.log('Page loaded');
});

//Array to populate buttons area with buttons

var searchArray = ['Dog', 'Cat', 'Bird'];

//Function to pupulate the buttonn area with additional search terms when submitted
//add to the search array, add a class and add to the area (function (Array,class,location))
function populateButtons(searchArray, classToAdd, areaToAddTo) {
  //emptying out the button area when starting
  $(areaToAddTo).empty();

  //for loop to continuous add search terms to searchArray and modify buttonand searcg area accordingly
  for (var i = 0; i < searchArray.length; i++) {
    //declaring a new button/variable
    var a = $('<button>');
    //when a seach term is entered. I want it to add a class and data type to the new button
    a.addClass(classToAdd);
    a.attr('data-type', searchArray[i]);
    a.text(searchArray[i]);
    //I want to append a to the area to add so the button is displayed
    $(areaToAddTo).append(a);
  }
}

//on click event to recognize which button is clicked
$(document).on('click', '.searchButton', function() {
  $('#searches').empty();
  var type = $(this).data('type');

  //test to display which button was clicked in console log
  console.log(type);

  //I will use the button to query the GIPHY API using AJAX call
  var queryURL =
    'https://api.giphy.com/v1/gifs/search?api_key=b3yo65vk3oMvd3budjFlthRctK7bllWO&q=' +
    type +
    '&limit=10';

  $.ajax({
    url: queryURL,
    method: 'GET'
  })
    //Done function to get response from API
    .done(function(response) {
      //test to make check if I am getting a response
      console.log(response);

      for (var i = 0; i < response.data.length; i++) {
        var searchDiv = $('<div class="search-item">');
        var rating = response.data[i].rating;
        var p = $('<p>').text('Rating: ' + rating);
        var animated = response.data[i].images.fixed_height.url;
        var still = response.data[i].images.fixed_height_still.url;
        var image = $('<img>');
        image.attr('src', still);
        image.attr('data-still', still);
        image.attr('data-animated', animated);
        image.attr('data-state', 'still');
        image.addClass('searchImage');
        searchDiv.append(p);
        searchDiv.append(image);
        $('#searches').append(searchDiv);
      }
    });
});

//Function to change picture state from still to animated and vise versa
$(document).on('click', '.searchImage', function() {
  var state = $(this).attr('data-state');
  if (state == 'still') {
    $(this).attr('src', $(this).data('animated'));
    $(this).attr('data-state', 'animated');
  } else {
    $(this).attr('src', $(this).data('still'));
    $(this).attr('data-state', 'still');
  }
});

//Add more buttons when search new animals pics
$('#addSearch').on('click', function() {
  //eq(0) used to ensure it takes the value from the text input not submit button input.
  var newSearch = $('input')
    .eq(0)
    .val();
  //pushing it to seach array
  searchArray.push(newSearch);
  //want to popoulate button to buttosArea
  populateButtons(searchArray, 'searchButton', '#buttonsArea');
  //must return false or page will continuously reload and only show the 3 original buttons.
  return false;
});
