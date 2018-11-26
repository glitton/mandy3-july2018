"use strict";

$(document).ready(function() {
  // Back to top js
  $(window).scroll(function() {
    if ($(this).scrollTop() > 50) {
      $("#back-to-top").fadeIn();
    } else {
      $("#back-to-top").fadeOut();
    }
  });
  // scroll body to 0px on click
  $("#back-to-top").click(function() {
    $("#back-to-top").tooltip("hide");
    $("body,html").animate(
      {
        scrollTop: 0
      },
      800
    );
    return false;
  });

  $("#back-to-top").tooltip("show");

  // Modals
  $(".launch-modal").on("click", function(e) {
    e.preventDefault();
    $("#" + $(this).data("modal-id")).modal();
  });

  // Stops YouTube video when modal window is closed
  // Alone Together
  $(".close-alone").on("click", function() {
    var video = $(".alone").attr("src");
    $(".alone").attr("src", "");
    $(".alone").attr("src", video);
  });
  // Rainy Day
  $(".close-rainy").on("click", function() {
    var rainyDay = $(".rainy").attr("src");
    $(".rainy").attr("src", "");
    $(".rainy").attr("src", rainyDay);
  });

  // Turns off audio when modal window is closed
  // Ornithology
  $("#modal-ornithology").on("hide.bs.modal", function() {
    // for each audio tag
    $("audio").each(function() {
      this.pause(); // Stop playing
      this.currentTime = 0; // Reset time
    });
  });
  // Stolen Moments
  $("#modal-stolen").on("hide.bs.modal", function() {
    // for each audio tag
    $("audio").each(function() {
      this.pause(); // Stop playing
      this.currentTime = 0; // Reset time
    });
  });
  // Free Peace
  $("#modal-free").on("hide.bs.modal", function() {
    // for each audio tag
    $("audio").each(function() {
      this.pause(); // Stop playing
      this.currentTime = 0; // Reset time
    });
  });

  // Main Carousel
  $(".carousel").carousel({
    interval: 8000 //changes the speed
  });

  // Set default volume of audio to match video
  document.getElementById("audioStolen").volume = 0.1;


/////////////////////////////////////
// User Timing -> New Relic Browser Polyfill
/////////////////////////////////////

/**
 * Adds user timing marks to:
 *   - New Relic Browser session traces
 *   - New Relic PageView event (as a custom attribute)
 * usage:
 *   performance.mark('eventName');
 * Clay Smith, 8/15/17
*/

(function(window) {
    var performance = window.performance || {};
    if (!performance.mark) {
      return; // W3C User Timing API not supported
    }

    var sendToNewRelic = function(name, timing) {
      if (typeof newrelic !== 'object') {
        return;
      }
      // addToTraceFacade expects time relative to unix epoch
      // workaround: addToTraceFacade only accepts integers or 500s
      var start = Math.round(performance.timing.navigationStart + timing, 0);
      var traceData = {name: name,
                       start: start};

      newrelic.addToTrace(traceData);
      newrelic.setCustomAttribute(name, timing/1000);
    };

    // Flush any pre-existing performance marks
    var marks = performance.getEntriesByType('mark');
    for (var i = 0; i < marks.length; i++) {
      sendToNewRelic(marks[i].name, marks[i].startTime);
    }

    var originalMark = performance.mark;
    performance.mark = function() {
      var now = Date.now();
      var args = [].slice.call(arguments, 0);
      // Add mark to trace
      if (args.length > 0 && window.newrelic) {
        var traceData = {name: args[0], start: now};
        sendToNewRelic(args[0], now - performance.timing.navigationStart)
      }

      return originalMark.apply(this, args);
    }
    window.performance = performance;
  })(window);
});
