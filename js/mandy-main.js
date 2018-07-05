"use strict"

$(document).ready(function(){
    // Back to top js
     $(window).scroll(function () {
            if ($(this).scrollTop() > 50) {
                $('#back-to-top').fadeIn();
            } else {
                $('#back-to-top').fadeOut();
            }
        });
        // scroll body to 0px on click
        $('#back-to-top').click(function () {
            $('#back-to-top').tooltip('hide');
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
        
        $('#back-to-top').tooltip('show');

     // Modals   
    $('.launch-modal').on('click', function(e){
        e.preventDefault();
        $( '#' + $(this).data('modal-id') ).modal();
    });  

    // Stops YouTube video when modal window is closed
    // Alone Together
    $('.close-alone').on('click', function(){
        var video = $('.alone').attr('src');
          $('.alone').attr('src','');
          $('.alone').attr('src', video);
        }
      )
    // Rainy Day
    $('.close-rainy').on('click', function(){
        var rainyDay = $('.rainy').attr('src');
          $('.rainy').attr('src','');
          $('.rainy').attr('src', rainyDay);
        }
      )        

    // Turns off audio when modal window is closed
    // Ornithology
    $('#modal-ornithology').on('hide.bs.modal', function () {
    // for each audio tag
      $('audio').each(function(){
      this.pause(); // Stop playing
      this.currentTime = 0; // Reset time
      });
    })
    // Stolen Moments
    $('#modal-stolen').on('hide.bs.modal', function () {
    // for each audio tag
      $('audio').each(function(){
      this.pause(); // Stop playing
      this.currentTime = 0; // Reset time
      });
    })
    // Free Peace
    $('#modal-free').on('hide.bs.modal', function () {
    // for each audio tag
      $('audio').each(function(){
      this.pause(); // Stop playing
      this.currentTime = 0; // Reset time
      });
    })

    // Main Carousel
    $('.carousel').carousel({
      interval: 8000 //changes the speed
    });

    // Set default volume of audio to match video
    document.getElementById("audioStolen").volume = 0.1;

  
});