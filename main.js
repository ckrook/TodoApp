window.onload = function () {
  getCurrentLocation();
};

function getCurrentLocation() {
  window.navigator.geolocation.getCurrentPosition(success, error);
}

function success(e) {
  console.log(e);
}

function error(e) {
  console.log(e);
}
