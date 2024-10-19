"use client";
import { useEffect } from "react";

const ChatBot = () => {
	useEffect(() => {
		// Add the chatbot configuration script
		const chatbotConfigScript = document.createElement("script");
		chatbotConfigScript.innerHTML = `window.chtlConfig = { chatbotId: "1866789818" }`;
		document.head.appendChild(chatbotConfigScript);

		// Add the chatbot embed script
		const chatlingScript = document.createElement("script");
		chatlingScript.async = true;
		chatlingScript.src = "https://chatling.ai/js/embed.js";
		chatlingScript.setAttribute("data-id", "1866789818");
		chatlingScript.setAttribute("id", "chatling-embed-script");
		chatlingScript.setAttribute("type", "text/javascript");
		document.head.appendChild(chatlingScript);

		// Cleanup function to remove the scripts when the component unmounts
		return () => {
			document.head.removeChild(chatbotConfigScript);
			document.head.removeChild(chatlingScript);
		};
	}, []);

	return null; // The component doesn't need to render anything
};

export default ChatBot;
