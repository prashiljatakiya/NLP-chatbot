
class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.chatbox__button'),
        };
        this.state = false;
        this.messages = [];
    }

    display() {
        const { openButton, chatBox, sendButton } = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox));
        sendButton.addEventListener('click', () => this.onSendButton(chatBox));
        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({ key: string }) => {
            if (string === "Enter") {
                this.onSendButton(chatBox);
            }
        });
    }

    toggleState(chatBox) {
        this.state = !this.state;
        if (this.state) {
            chatBox.classList.add('chatbox--active');
        } else {
            chatBox.classList.remove('chatbox--active');
        }
    }

    onSendButton(chatbox) {
        var textfield = chatbox.querySelector('input');
        let text1 = textfield.value; // Fixed variable name

        if (text1 === "") {
            return;
        }

        let msg1 = { name: "User", message: text1 };
        this.messages.push(msg1);

        fetch($SCRIPT_ROOT + '/predict', {
            method: 'POST',
            body: JSON.stringify({ message: text1 }),
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(r => r.json())
            .then(r => {
                let msg2 = { name: "Sam", message: r.answer };
                this.messages.push(msg2);
                this.updateChatText(chatbox); // Fixed method name
                textfield.value = '';
            })
            .catch((error) => {
                console.error('Error:', error);
                this.updateChatText(chatbox); // Fixed method name
                textfield.value = '';
            });
    }

    updateChatText(chatBox) { // Fixed method name
        var html = '';
        this.messages.slice().reverse().forEach(function (item) {
            if (item.name === "Sam") {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>';
            } else {
                html += '<div class="messages__item messages__item--user">' + item.message + '</div>'; // Fixed class name
            }
        });
        const chatmessage = chatBox.querySelector('.chatbox__messages'); // Fixed selector
        chatmessage.innerHTML = html; // Fixed property name
    }
}

const chatbox = new Chatbox();
chatbox.display();



