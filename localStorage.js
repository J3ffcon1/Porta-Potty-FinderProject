//Features function allows us to create a template for the all the values we need to fill into the reviews page.
var Features = function (title, hours, position, handWash, privacy, clean, rollRating, comment) {
  this.title = title;
  this.hours = hours;
  this.position = position;
  this.distance = 0;
  this.type = "potty";
  this.wash = handWash;
  this.privacy = privacy;
  this.clean = clean;
  this.overall = rollRating;
  this.comment = comment;
}

//this function allows us to store our longitude and latitude using local storage, under the key name Coordinates.
function getCoordinates() {
  var longlat = localStorage.getItem('Coordinates');

  var longlatnumber = JSON.parse(longlat);
  console.log(longlatnumber);
  //prints the value stored in local storage to the position1 and position2 id in our fieldset form.
  document.getElementById('position1').value = longlatnumber.lat;
  document.getElementById('position2').value = longlatnumber.lng;
}

//this function deals with creating an object that has all our form data.
function handleSubmit(event) {
  event.preventDefault();
  console.log(event.target.wash.value);

  var newFeature = new Features (
    event.target.reviewtitle.value,
    event.target.hours.value,
    {lat: parseFloat(event.target.lat.value),
      lng: parseFloat(event.target.long.value)} ,
      event.target.wash.value,
      event.target.privacy.value,
      event.target.clean.value,
      event.target.rollRating.value,
      event.target.comment.value);

      console.log(newFeature);

      var portapotties = localStorage.getItem('pottySpots');
      var portapottiesarray = [];
      //changes our string in local storage from a string to an object.
      if (portapotties) {
        portapottiesarray = JSON.parse(portapotties);
      }
      //pushes to our newFeature array, putting all the data into our Features template.
      portapottiesarray.push(newFeature);
      portapottiesarray = JSON.stringify(portapottiesarray);
      //converts portapottiesarray to a string after it has been pushed to newFeature
      localStorage.setItem('pottySpots', portapottiesarray);
      //now the portapottiesarray is a string it can be put into local storage under the key name pottySpots.
      location.href = "index.html";
      //load main page once submit is pushed.
    }

    //gets the reviewform data and submits the form by running the handleSubmit function.
    document.getElementById('reviewform').addEventListener('submit', handleSubmit);
    //as soon as the page loads run the getCoordinates function, which grabs from local storage and automatically loads the long and lat in the review page.
    window.addEventListener("load", getCoordinates);
