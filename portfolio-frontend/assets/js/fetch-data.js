$(document).ready(function() {
          // Fetch hero section
          $.get('../portfolio-backend/api/get-hero.php', function(data) {
              $('#hero-title').text(data.title);
              $('#hero-subtitle').text(data.subtitle);
              $('#hero-cta').attr('href', 'mailto:' + data.email).text(data.cta_text);
          });
      
          // Fetch about section
          $.get('../portfolio-backend/api/get-about.php', function(data) {
              $('#about-bio').text(data.bio);
              $('#about-education').text(data.education);
              $('#about-photo').attr('src', data.photo_url);
          });
      
          // Fetch skills
          $.get('../portfolio-backend/api/get-skills.php', function(data) {
              let skillsHtml = '';
              data.forEach(skill => {
                  skillsHtml += `
                      <div class="col-md-4 mb-3">
                          <img src="${skill.icon_url}" alt="${skill.name}" width="50">
                          <h5>${skill.name}</h5>
                          <div class="progress">
                              <div class="progress-bar" style="width: ${skill.percentage}%">${skill.percentage}%</div>
                          </div>
                      </div>`;
              });
              $('#skills-list').html(skillsHtml);
          });
      
          // Fetch projects
          $.get('../portfolio-backend/api/get-projects.php', function(data) {
              let projectsHtml = '';
              let limit = (window.location.pathname.includes('index.html')) ? 3 : data.length;
              data.slice(0, limit).forEach(project => {
                  projectsHtml += `
                      <div class="col-md-4 mb-4">
                          <div class="card">
                              <img src="${project.image_url}" class="card-img-top" alt="${project.title}">
                              <div class="card-body">
                                  <h5 class="card-title">${project.title}</h5>
                                  <p class="card-text">${project.desc.substring(0, 100)}...</p>
                                  <button class="btn btn-primary view-project" data-project='${json.stringify(project)}'>View More</button>
                              </div>
                          </div>
                      </div>`;
                  });
              $('#project-list').html(projectsHtml);
      
              // Project modal click
              $('.view-project').on('click', function() {
                  let project = JSON.parse($(this).data('project'));
                  $('#modal-title').text(project.title);
                  $('#modal-image').attr('src', project.image_url);
                  $('#modal-desc').text(project.desc);
                  $('#modal-tech').text(project.tech);
                  $('#modal-github').attr('href', project.github_link);
                  $('#modal-demo').attr('href', project.demo_link);
                  $('#projectModal').modal('show');
              });
          });
      
          // Fetch experience
          $.get('../portfolio-backend/api/get-experience.php', function(data) {
              let expHtml = '<ul class="timeline">';
              data.forEach(exp => {
                  expHtml += `
                      <li>
                          <h4>${exp.role}</h4>
                          <p>${exp.organization} • ${exp.duration}</p>
                          <p>${exp.summary}</p>
                      </li>`;
              });
              expHtml += '</ul>';
              $('#experience-list').html(expHtml);
          });
      
          // Fetch contact info
          $.get('../portfolio-backend/api/get-contact.php', function(data) {
              $('#contact-email').html(`Email: <a href="mailto:${data.email}">${data.email}</a>`);
              $('#contact-phone').text(`Phone: ${data.phone}`);
              $('#contact-github').html(`GitHub: <a href="${data.github}">${data.github}</a>`);
              $('#contact-linkedin').html(`LinkedIn: <a href="${data.linkedin}">${data.linkedin}</a>`);
          });
      });