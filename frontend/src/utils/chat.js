import { OpenAI } from "openai";

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/together/v1",
  apiKey: "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",
  dangerouslyAllowBrowser: true, // for local browsers
});

export const generateAIResponse = async (message) => {
  try {
    const response = await client.chat.completions.create({
      model: "deepseek-ai/DeepSeek-R1",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      max_tokens: 500,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating AI response:", error);
    return "I apologize, but I'm having trouble processing your request at the moment.";
  }
};
