interface DataModel {
  model_name: string;
  short_description: string;
  provider_name: string;
  long_description: string;
}

export const data: DataModel[] = [
  {
    model_name: "LaMA-1",
    short_description:
      "An efficient language model by LaMA for general-purpose text generation.",
    provider_name: "LaMA",
    long_description:
      "LaMA-1 is a versatile model designed for general-purpose text generation tasks. It excels in producing coherent and contextually relevant text across a variety of domains, making it suitable for applications such as chatbots, content creation, and more.",
  },
  {
    model_name: "LaMA-2",
    short_description:
      "An advanced version of LaMA-1 with improved accuracy and speed.",
    provider_name: "LaMA",
    long_description:
      "LaMA-2 builds upon the capabilities of LaMA-1, offering enhanced accuracy and faster processing. It is ideal for applications that require high-speed responses without compromising on the quality of generated text, such as interactive AI and virtual assistants.",
  },

  {
    model_name: "ChatGPT-3.5",
    short_description: "A powerful conversational AI model by OpenAI.",
    provider_name: "OpenAI",
    long_description:
      "ChatGPT-3.5 is a highly advanced conversational AI model developed by OpenAI. It is capable of understanding and generating human-like responses in a dialogue format, making it suitable for applications such as customer support, virtual assistants, and interactive chatbots.",
  },
  {
    model_name: "ChatGPT-4",
    short_description:
      "The latest version of ChatGPT with enhanced capabilities and performance.",
    provider_name: "OpenAI",
    long_description:
      "ChatGPT-4 represents the latest advancements in OpenAI's conversational AI technology. It features improved natural language understanding and generation, allowing it to handle more complex conversations and provide more accurate and contextually appropriate responses.",
  },
  {
    model_name: "BERT",
    short_description:
      "A transformer-based model for natural language understanding.",
    provider_name: "Google AI",
    long_description:
      "BERT (Bidirectional Encoder Representations from Transformers) is designed for natural language understanding tasks. It excels in tasks such as question answering, sentiment analysis, and language inference by utilizing a bidirectional training approach that considers context from both directions.",
  },
  {
    model_name: "GPT-Neo",
    short_description:
      "An open-source alternative to GPT-3 developed by EleutherAI.",
    provider_name: "EleutherAI",
    long_description:
      "GPT-Neo is an open-source language model that aims to provide a powerful alternative to proprietary models like GPT-3. It supports various natural language processing tasks and is designed to be freely available for research and development purposes.",
  },
  {
    model_name: "T5",
    short_description: "A text-to-text transfer transformer model by Google.",
    provider_name: "Google AI",
    long_description:
      "T5 (Text-to-Text Transfer Transformer) treats every NLP problem as a text generation task, allowing for a unified approach to various tasks such as translation, summarization, and question answering. Its flexible architecture makes it highly adaptable to different NLP challenges.",
  },
  {
    model_name: "T6",
    short_description: "A text-to-text transfer transformer model by Google.",
    provider_name: "Google AI",
    long_description:
      "T5 (Text-to-Text Transfer Transformer) treats every NLP problem as a text generation task, allowing for a unified approach to various tasks such as translation, summarization, and question answering. Its flexible architecture makes it highly adaptable to different NLP challenges.",
  },
];
