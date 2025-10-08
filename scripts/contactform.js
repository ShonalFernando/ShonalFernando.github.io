const form = document.getElementById('contact-form');
const loading = form.querySelector('.loading');
const errorMessage = form.querySelector('.error-message');
const sentMessage = form.querySelector('.sent-message');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  loading.style.display = 'block';
  errorMessage.style.display = 'none';
  sentMessage.style.display = 'none';

  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: json
    })
    .then(async (response) => {
      let data = await response.json();
      loading.style.display = 'none';

      if (response.status === 200) {
        sentMessage.style.display = 'block';
        form.reset();
      } else {
        errorMessage.innerHTML = data.message;
        errorMessage.style.display = 'block';
      }
    })
    .catch((error) => {
      console.error(error);
      loading.style.display = 'none';
      errorMessage.innerHTML = "Something went wrong!";
      errorMessage.style.display = 'block';
    });
});
