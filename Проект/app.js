// Получаем элементы DOM
const messages = document.getElementById('messages');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

// Функция для добавления сообщений в диалоговое окно
function addMessage(message, isUser) {
  const div = document.createElement('div');
  div.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
  div.textContent = message;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function openRegisterModal() {
  document.getElementById("register-modal").style.display = "block";
}

function closeRegisterModal() {
  document.getElementById("register-modal").style.display = "none";
}

document.getElementById('register-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const registerData = {
    username,
    email,
    password
  };

  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registerData)
    });
    const result = await response.json();
    if (result.success) {
      alert('Вы успешно зарегистрированы!');
      closeRegisterModal(); // Закрываем модальное окно
      window.location.href = '/login'; // Переход на страницу входа
    } else {
      alert(result.message || 'Произошла ошибка при регистрации.');
    }
  } catch (error) {
    console.error('Ошибка при регистрации:', error);
    alert('Произошла ошибка при регистрации.');
  }
});

// Обработчик формы отправки сообщения
messageForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  // Получаем введенное пользователем сообщение
  const userMessage = messageInput.value.trim();
  if (!userMessage) return;

  // Добавляем сообщение пользователя в диалоговое окно
  addMessage(userMessage, true);

  // Очищаем поле ввода
  messageInput.value = '';

  try {
    // Отправка запроса на сервер через Fetch API
    const response = await fetch('https://your-api-url.com/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage })
    });

    // Получаем ответ от сервера
    const data = await response.json();

    // Добавляем ответ нейросети в диалоговое окно
    addMessage(data.response, false);
  } catch (error) {
    console.error('Ошибка при общении с API:', error);
    alert('Произошла ошибка при общении с нейросетью.');
  }
});

document.addEventListener('DOMContentLoaded', function () {
  var privacyBtn = document.getElementById('privacy-policy-btn');
  var modal = document.getElementById('privacy-policy-modal');
  var closeBtn = modal.querySelector('.close');

  // Открыть модальное окно при клике на кнопку
  privacyBtn.onclick = function () {
    modal.style.display = 'block';
  };

  // Закрыть модальное окно при клике на крестик
  closeBtn.onclick = function () {
    modal.style.display = 'none';
  };
});