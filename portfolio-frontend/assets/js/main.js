$(document).ready(function() {
          // Load header and footer
          $("#header").load("components/header.html");
          $("#footer").load("components/footer.html");
          $("#project-modal").load("components/modals/project-modal.html");
      
          // Smooth scrolling
          $('a[href^="#"]').on('click', function(e) {
              e.preventDefault();
              $('html, body').animate({
                  scrollTop: $($(this).attr('href')).offset().top
              }, 500);
          });
      
          // Star rating
          $('.star').on('click', function() {
              $('.star').removeClass('selected');
              $(this).addClass('selected').prevAll('.star').addClass('selected');
              $('#rating').val($(this).data('value'));
          });
      
          // Feedback form submission
          $('#feedback-form").submit(function(e) {
              e.preventDefault();
              $.ajax({
                  url: '../portfolio-backend/api/submit-feedback.php',
                  method: 'POST',
                  data: $(this).serialize(),
                  success: function() {
                      alert('Feedback submitted!');
                      $('#feedback-form")[0].reset();
                      $('.star').removeClass('selected');
                  },
                  error: function() {
                      alert('Error submitting feedback.');
                  }
              });
          });
      
          // Contact form submission
          $('#contact-form').submit(function(e) {
              e.preventDefault();
              $.ajax({
                  url: '../portfolio-backend/contact/submit-form.php',
                  method: 'POST',
                  data: $(this).serialize(),
                  success: function() {
                      alert('Message sent!');
                      $('#contact-form')[0].reset();
                  },
                  error: function() {
                      alert('Error sending message.');
                  }
              });
          });
      });