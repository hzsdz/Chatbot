
let currentUser = localStorage.getItem('user');
let currentChat = currentUser === 'admin' ? '1' : 'admin';

if (window.location.pathname.includes('chat.html')) {
  if (!currentUser) window.location.href = 'index.html';

  const userList = document.getElementById('user-list');
  const chatBox = document.getElementById('chat-box');
  const chatWith = document.getElementById('chat-with');

  if (currentUser === 'admin') {
    for (let i = 1; i <= 7; i++) {
      const userBtn = document.createElement('button');
      userBtn.textContent = 'User ' + i;
      userBtn.onclick = () => {
        currentChat = i.toString();
        chatWith.textContent = 'Chat mit User ' + i;
        renderMessages();
      };
      userList.appendChild(userBtn);
    }
  } else {
    chatWith.textContent = 'Chat mit Admin';
  }

  renderMessages();

  window.sendMessage = () => {
    const msg = document.getElementById('message').value;
    if (!msg) return;
    const key = currentUser === 'admin' ? currentChat : currentUser;
    const messages = JSON.parse(localStorage.getItem('chat_' + key) || '[]');
    messages.push({ from: currentUser, text: msg });
    localStorage.setItem('chat_' + key, JSON.stringify(messages));
    document.getElementById('message').value = '';
    renderMessages();
  };

  function renderMessages() {
    const key = currentUser === 'admin' ? currentChat : currentUser;
    const messages = JSON.parse(localStorage.getItem('chat_' + key) || '[]');
    chatBox.innerHTML = '';
    messages.forEach(msg => {
      const div = document.createElement('div');
      div.className = msg.from === currentUser ? 'msg msg-right' : 'msg msg-left';
      div.textContent = msg.text;
      chatBox.appendChild(div);
    });
    chatBox.scrollTop = chatBox.scrollHeight;
  }
}

window.login = () => {
  const pw = document.getElementById('password').value;
  if (pw === '0612') {
    localStorage.setItem('user', 'admin');
    window.location.href = 'chat.html';
  } else if (['1','2','3','4','5','6','7'].includes(pw)) {
    localStorage.setItem('user', pw);
    window.location.href = 'chat.html';
  } else {
    document.getElementById('error').textContent = 'Falsches Passwort!';
  }
};
