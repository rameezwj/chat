(function(){
	// variable to hold textarea value; initialy set to empty
	let query = '';

  // get chat history and render in history box
  chat.getChatHistory((chats)=>{
  	chats.map((v,i)=>{
	  	generateChatRow('p', v.message, v.from, '.chat_history');
  	})

  	let objDiv = document.querySelector('.chat_history');
  	objDiv.scrollTop = objDiv.scrollHeight;
  });

  // attach custom event
	document.querySelector('#chatSubmit').addEventListener('chatreceived', function (e) {
		// console.log(e.detail)
		generateChatRow('p', e.detail.message, e.detail.from, '.chat_history');
	}, false);

	document.querySelector('#chatSubmit').addEventListener('click', function (e) {
		if(query=='')
			return false;

		chat.sendChat(query);
		chatInput.value = '';
		query = '';
	});

	// generate single chat row
	function generateChatRow(tag, message, from, appendTo){
  	let node = document.createElement(tag);
  	node.classList.add(from.toLowerCase());
  	let textnode = document.createTextNode(message);
  	node.appendChild(textnode);
		document.querySelector(appendTo).appendChild(node);
		gsap.fromTo(node, .3, {opacity: 0, y: 20}, {opacity: 1, y: 0});
	}

	// updates query variable as users types
	chatInput.addEventListener('keyup', function (e) {
		query = chatInput.value;
		// console.log(e)

		// if user hit Enter key, chat message will be submitted
		if(e.key=='Enter')
			document.querySelector('#chatSubmit').click();
	});

})();