const response = await fetch("/chat/conversational_rag_chat", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    question: "text",
    knowledge_source_id: "text",
  }),
});
const data = await response.json();
