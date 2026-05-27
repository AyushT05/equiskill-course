import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY || process.env.GROQ_API_KEY,
    dangerouslyAllowBrowser: true 
});

const modelName = "llama-3.3-70b-versatile";

export const GenerateCourseLayout_AI = {
    sendMessage: async (prompt) => {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a course generator. Return ONLY valid JSON."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            model: modelName,
            response_format: { type: "json_object" }
        });
        return {
            response: {
                text: () => chatCompletion.choices[0].message.content
            }
        };
    }
};

export const GenerateChapterContent_AI = {
    sendMessage: async (prompt) => {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a chapter content generator. Return ONLY valid JSON."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            model: modelName,
            response_format: { type: "json_object" }
        });
        return {
            response: {
                text: () => chatCompletion.choices[0].message.content
            }
        };
    }
};