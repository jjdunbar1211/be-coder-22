const socket = io.connect();

socket.on('message', (data) => {
  alert(data);
});

socket.on('update', (products) => {
  products.forEach((product) => {
    render(product);
  });
});

socket.on('updateChat', (messages) => {
  messages.forEach((message) => {
    renderChat(message);
  });
});

//Formularios
let submit = document.getElementById('form-product');
let submitChat = document.getElementById('form-Chat');

//Eventlistener para el form del submit de producto 
submit.addEventListener('submit', (e) => {
  let form = e.target;
  let inputs = new Object();
  e.preventDefault();
  form = submit.getElementsByTagName('input');
  for (let index = 0; index < form.length; index++) {
    inputs[form[index].name] = form[index].value;
  }
  socket.emit('new-product', { title: inputs.title, price: inputs.price, thumbnail: inputs.thumbnail });
  submit.reset();
});

//Eventlistener para el form del submit de mensajes
submitChat.addEventListener('submit', (e) => {
  let form = submitChat.getElementsByTagName('input');
  let inputText = document.getElementById('text');
  let inputs = new Object();
  e.preventDefault();

  for (let index = 0; index < form.length; index++) {
    inputs[form[index].name] = form[index].value;
  }
  socket.emit('new-message', inputs);
  inputText.value = '';
});

//Funcion para pintar un producto
render = (data) => {
  let listProduct = document.getElementById('list-Product');
  let newElement = document.createElement('tr');
  let htmlProducto = `
    <td>${data.title}</td>
    <td>${data.price}</td>
    <td>
      <div class='text-center wd-100'>
        <div
          class='card'
          style='width: 4rem; margin-left: auto; margin-right: auto;'
        >
          <img
            src='${data.thumbnail}'
            class='card-img-top mx-auto d-block'
            alt='...'
          />
        </div>
      </div>
    </td>
    `;
  newElement.innerHTML = htmlProducto;
  listProduct.appendChild(newElement);
};

//Funcion para pintar un mensaje en el chat
renderChat = (data) => {
  let chatUl = document.getElementById('messages');
  let newElement = document.createElement('li');
  newElement.className = 'message left appeared';
  let htmlMessage = `
  <div class="avatar"></div>
  <div class="text_wrapper">
      <span class="email">${data.email}</span>
      <span class="date"> [ ${data.date} ]: </span>
      <span class="text">${data.text}</span>
  </div>`;
  newElement.innerHTML = htmlMessage;
  chatUl.appendChild(newElement);
  chatUl.scrollTo(0, document.body.scrollHeight);
};