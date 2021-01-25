"use strict";

// document.addEventListener("DOMContentLoaded", () =>{

//   const form = document.querySelector('form');

//   form.addEventListener('submit', (e) => {

//     e.preventDefault();

//     const formData = new FormData(e.target);

//     const {
//       isDataValid,
//       statusMessage
//     } = validateForm();

//     if (!isDataValid) {
//       document.getElementById('status').innerHTML = statusMessage;
//       return;
//     } else {
//       document.getElementById('status').innerHTML = `<p class="note note-success">Send email...</p>`;

//       fetch('../pages/mail.php', {
//         method: 'POST',
//         body: formData
//       })
//       .then(() => {
//           const values = document.querySelectorAll('.form-control');
//           values.forEach(value => {
//             value.textContent = '';
//           });  
//           document.getElementById('status').innerHTML = `<p class="note note-success">We sent the commercial offer to your e-mail address</p>`;
//           setTimeout(() => {
//             document.getElementById('status').innerHTML = '';
//           }, 2500);        

//           const modal = document.querySelector('#exampleModal');
//           setTimeout(() => {          
//             modal.classList.add("fade");
//             modal.classList.remove("show");
//           }, 3000);
//           setTimeout(() => { 
//             modal.style.display = "none";
//           }, 3500);
//       })
//       .catch((err) => {
//         console.log(err.message);
//       });
//     }


//   });

//   function validateForm() {
//     let isDataValid = true;
//     let statusMessage = '';

//     const name = document.getElementById('name').value;
//     if (name == "") {
//       statusMessage += `<p class="note note-danger"><strong>Name</strong> cannot be empty</p>`;
//       isDataValid = false;
//     }

//     const email = document.getElementById('email').value;
//     if (email == "") {
//       statusMessage += `<p class="note note-danger"><strong>Email</strong> cannot be empty</p>`;
//       isDataValid = false;
//     } else {
//       const re =
//         /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<p>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//       if (!re.test(email)) {
//         statusMessage += `<p class="note note-danger"><strong>Email</strong> is invalid</p>`;
//         isDataValid = false;
//       }
//     }

//     return {
//       isDataValid,
//       statusMessage
//     };
//   }

//   // const ajaxSend = (formData) => {
//   //   fetch('../pages/mail.php', { // файл обработчик
//   //     method: 'POST',
//   //     headers: { 
//   //       'Content-Type': 'application/json' // отправляем данные
//   //     }, 
//   //     body: JSON.stringify(formData)
//   //   })
//   //   .then(() => {
//   //       const status = document.getElementById('status');
//   //       status.innerHTML = `<p class="note note-light">We’ll send a commercial offer to you at the e-mail</p>`;
//   //       setTimeout(() => {
//   //       status.innerHTML = '';
//   //       form.reset();
//   //       }, 2500);

//   //   })
//   //   .then(() => {
//   //     const modal = document.querySelector('#exampleModal');
//   //     modal.classList.add("fade");
//   //     modal.classList.remove("show");
//   //     setTimeout(() => {
//   //       modal.style.display = "none";
//   //     }, 500);
//   //   })
//   //   .catch((err) => {
//   //     console.log(err.message);
//   //   });
//   // }; 

//   // const forms = document.getElementsByTagName('form');

//   //   for (let i = 0; i < forms.length; i++) {
//   //       forms[i].addEventListener('submit', function (e) {
//   //           e.preventDefault();

//   //           let formData = new FormData(this);
//   //           formData = Object.fromEntries(formData);

//   //           ajaxSend(formData);
//   //       });
//   //   }




// });


const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const {
    isDataValid,
    statusMessage
  } = validateForm();

  if (!isDataValid) {
    document.getElementById('status').innerHTML = statusMessage;
    return;
  } else {
    document.getElementById('status').innerHTML = `<p class="note note-light">Sending mail...</p>`;
  }

  fetch('../pages/mail.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(response => {
      if (response.code) {
        const values = document.querySelectorAll('[data-form]');
        values.forEach(item => {
          item.value = '';
        });
          
        document.getElementById('status').innerHTML = `<p class="note note-success">${response.message}</p>`;
        setTimeout(() => {
          document.getElementById('status').innerHTML = '';
        }, 5000);
      } else {
        document.getElementById('status').innerHTML = `<p class="note note-danger">${response.message}</p>`;
      }
    })
    .then(() => {
      const modal = document.querySelector('#exampleModal');
      setTimeout(() => {
        modal.classList.add("fade");
        modal.classList.remove("show");
      }, 5000);
      setTimeout(() => {
        modal.style.display = "none";
      }, 5500);
    })
    .catch((err) => {
      console.log(err.message);
    });
});


function validateForm() {
  let isDataValid = true;
  let statusMessage = '';

  const name = document.getElementById('name').value;
  if (name == "") {
    statusMessage += `<p class="note note-danger"><strong>Name</strong> cannot be empty</p>`;
    isDataValid = false;
  }

  const email = document.getElementById('email').value;
  if (email == "") {
    statusMessage += `<p class="note note-danger"><strong>Email</strong> cannot be empty</p>`;
    isDataValid = false;
  } else {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<p>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(email)) {
      statusMessage += `<p class="note note-danger"><strong>Email</strong> is invalid</p>`;
      isDataValid = false;
    }
  }
  const message = document.getElementById('message').value;
  if (message == "") {
    statusMessage += `<p class="note note-danger"><strong>Message</strong> cannot be empty</p>`;
    isDataValid = false;
  }

  return {
    isDataValid,
    statusMessage
  };
}