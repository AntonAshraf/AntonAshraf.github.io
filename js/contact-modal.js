$(document).ready(function () {
  // Inject contact modal if not present
  if ($('#contactModal').length === 0) {
    const contactHTML = `
    <!-- Contact Widget -->
    <div class="contact-widget">
      <button type="button" class="contact-btn" data-toggle="modal" data-target="#contactModal" title="Contact Me">
        <i class="fa fa-envelope"></i>
      </button>
    </div>

    <!-- Contact Modal -->
    <div class="modal fade" id="contactModal" tabindex="-1" role="dialog" aria-labelledby="contactModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="contactModalLabel">
              <i class="fa fa-envelope mr-2"></i>Get In Touch
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div id="contact-success-message" class="alert alert-success" style="display: none;">
              <i class="fa fa-check-circle mr-2"></i> Message sent successfully!
            </div>
            <div id="contact-error-message" class="alert alert-danger" style="display: none;">
              <i class="fa fa-exclamation-circle mr-2"></i> Oops! Something went wrong.
            </div>
            <form id="contactForm" action="https://formspree.io/f/manjoaoj" method="POST">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="contactName">
                      <i class="fa fa-user mr-1"></i>Your Name *
                    </label>
                    <input type="text" class="form-control" id="contactName" name="name" placeholder="Full Name" required>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="contactEmail">
                      <i class="fa fa-envelope mr-1"></i>Your Email *
                    </label>
                    <input type="email" class="form-control" id="contactEmail" name="email" placeholder="Email" required>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="contactMessage">
                  <i class="fa fa-comment mr-1"></i>Your Message *
                </label>
                <textarea class="form-control" id="contactMessage" name="message" rows="5" placeholder="Write your message here... I'd love to hear from you!" required></textarea>
              </div>
              <input type="hidden" name="_captcha" value="false">
              <button type="submit" class="btn btn-send" id="submitBtn">
                <i class="fa fa-paper-plane mr-2"></i>Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>`;

    $('body').append(contactHTML);
  }

  // Submit handler
  $(document).on('submit', '#contactForm', function (e) {
    e.preventDefault();

    const form = this;
    const $submitBtn = $('#submitBtn');
    const originalBtnText = $submitBtn.html();

    // Loading state
    $submitBtn.prop('disabled', true).html('<i class="fa fa-spinner fa-spin mr-2"></i>Sending...');

    $.ajax({
      url: form.action,
      method: form.method,
      data: $(form).serialize(),
      dataType: 'json',
      success: function () {
        $('#contact-success-message').show();
        $('#contact-error-message').hide();
        form.reset();

        setTimeout(() => {
          $('#contactModal').modal('hide');
          $('#contact-success-message').hide();
        }, 2000);
      },
      error: function () {
        $('#contact-error-message').show();
        $('#contact-success-message').hide();
      },
      complete: function () {
        $submitBtn.prop('disabled', false).html(originalBtnText);
      }
    });
  });

  // Reset on modal close
  $(document).on('hidden.bs.modal', '#contactModal', function () {
    $('#contactForm')[0].reset();
    $('#contact-success-message').hide();
    $('#contact-error-message').hide();
    $('#submitBtn').prop('disabled', false).html('<i class="fa fa-paper-plane mr-2"></i>Send Message');
  });

  // Load Font Awesome if missing
  if ($('link[href*="font-awesome"]').length === 0) {
    $('head').append('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">');
  }
});
