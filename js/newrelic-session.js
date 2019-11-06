/* -----------------------------------------------------------------	
Extension for the New Relic Browser agent to add a user session
attribute which expires after a period of inactivity.
-------------------------------------------------------------------- */

function getCookie(cookieName) {
  var name = cookieName + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function generateId() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function setCookie(cookieName, cookieValue, maxAge) {
  document.cookie =
    cookieName + "=" + cookieValue + "; max-age=" + maxAge * 60 + "; path=/";
}

function setNrAttributes(name, value) {
  newrelic.setCustomAttribute(name, value);
  newrelic.interaction().setAttribute(name, value);
}

function recordActivity() {
  activityRecorded = true;
}

function keepSessionCurrent() {
  // Check for existing session ID
  sessionId = getCookie("nr-user-session");

  if (sessionId != "") {
    // If a cookie with session ID already exists, set custom attributes using it
    // and then reset the cookie expiration timer

    setNrAttributes("userSessionID", sessionId);
    setCookie("nr-user-session", sessionId, timeoutMinutes);
  } else {
    // If no cookie with session ID exists, generate a new ID and then create
    // the cookie to store it
    sessionId = generateId();
    setNrAttributes("userSessionID", sessionId);
    setCookie("nr-user-session", sessionId, timeoutMinutes);
  }
}

if (typeof newrelic !== "undefined") {
  if (navigator.cookieEnabled) {
    var timeoutMinutes = 30;
    var activityRecorded = false;
    var sessionId = "";

    // When page first loads, check session cookie and update if necessary
    keepSessionCurrent();

    // Set up event listeners to track user activity
    var events = [
      "click",
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart"
    ];
    events.forEach(function(name) {
      document.addEventListener(name, recordActivity, true);
    });

    // Each minute, check if activity has occurred and reset cookie expiration if so
    var updateCycle = setInterval(function() {
      if (activityRecorded == true) {
        keepSessionCurrent();
        activityRecorded = false;
      }
    }, 60000);
  } else {
    setNrAttributes("userSessionID", "Unable to set cookie");
  }
}
