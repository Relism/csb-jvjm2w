let dialogue = {};
const jsonOutput = document.getElementById("jsonOutput");
const dialogueContainer = document.getElementById("dialogue");
const copyToClipboardButton = document.getElementById("copyToClipboard");

addNode(dialogue, true);

function updateJsonOutput() {
	jsonOutput.value = JSON.stringify(dialogue, null, 2);
}

function renderDialogue() {
	dialogueContainer.innerHTML = "";
	renderNode(dialogue, dialogueContainer);
}

function addNode(parent, isRoot = false) {
	const node = { message: "", trigger: "", options: [] };
	if (parent.options) {
		parent.options.push(node);
	} else {
		parent.options = [node];
	}
	updateJsonOutput();
	renderDialogue();
	if (isRoot) {
		dialogue = node;
	}
}

function renderNode(node, parentElement) {
	const div = document.createElement("div");
	div.classList.add("node");

	const messageInput = document.createElement("input");
	messageInput.setAttribute("type", "text");
	messageInput.setAttribute("placeholder", "Message");
	messageInput.value = node.message || "";
	messageInput.addEventListener("input", () => {
		node.message = messageInput.value;
		updateJsonOutput();
	});
	div.appendChild(messageInput);

	const addOptionButton = document.createElement("button");
	addOptionButton.textContent = "Add Option";
	addOptionButton.addEventListener("click", () => {
		addOption(node);
	});
	div.appendChild(addOptionButton);

	if (node.options) {
		node.options.forEach((option) => {
			renderOption(option, div);
		});
	}

	parentElement.appendChild(div);
}

function addOption(parent) {
	const option = { text: "", responses: [] };
	if (parent.options) {
		parent.options.push(option);
	} else {
		parent.options = [option];
	}
	updateJsonOutput();
	renderDialogue();
}

function renderOption(option, parentElement) {
	const div = document.createElement("div");
	div.classList.add("node");

	const textInput = document.createElement("input");
	textInput.setAttribute("type", "text");
	textInput.setAttribute("placeholder", "Option ID");
	textInput.value = option.text || "";
	textInput.addEventListener("input", () => {
		option.text = textInput.value;
		updateJsonOutput();
	});
	div.appendChild(textInput);

	const addResponseButton = document.createElement("button");
	addResponseButton.textContent = "Add Response";
	addResponseButton.addEventListener("click", () => {
		addResponse(option.responses);
	});
	div.appendChild(addResponseButton);

	if (option.responses) {
		option.responses.forEach((response) => {
			renderResponse(response, div);
		});
	}

	parentElement.appendChild(div);
}

function addResponse(responses) {
	const response = { message: "", trigger: "", options: [] };
	responses.push(response);
	updateJsonOutput();
	renderDialogue();
}

function renderResponse(response, parentElement) {
	const div = document.createElement("div");
	div.classList.add("node");

	const messageInput = document.createElement("input");
	messageInput.setAttribute("type", "text");
	messageInput.setAttribute("placeholder", "Message");
	messageInput.value = response.message || "";
	messageInput.addEventListener("input", () => {
		response.message = messageInput.value;
		updateJsonOutput();
	});
	div.appendChild(messageInput);

	const triggerInput = document.createElement("input");
	triggerInput.setAttribute("type", "text");
	triggerInput.setAttribute("placeholder", "Trigger");
	triggerInput.value = response.trigger || "";
	triggerInput.addEventListener("input", () => {
		response.trigger = triggerInput.value;
		updateJsonOutput();
	});
	div.appendChild(triggerInput);

	const addOptionButton = document.createElement("button");
	addOptionButton.textContent = "Add Option";
	addOptionButton.addEventListener("click", () => {
		addOption(response);
	});
	div.appendChild(addOptionButton);

	if (response.options) {
		response.options.forEach((option) => {
			renderOption(option, div);
		});
	}

	parentElement.appendChild(div);
}

copyToClipboardButton.addEventListener("click", () => {
	jsonOutput.select();
	document.execCommand("copy");
});

updateJsonOutput();
renderDialogue();
