import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const askPhysicsTutor = async (question: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: question,
      config: {
        systemInstruction: `أنت معلم فيزياء خبير للصف العاشر في فلسطين. 
        اشرح المفاهيم بوضوح وبساطة باللغة العربية.
        اعتمد على مفاهيم: الميكانيكا، الموائع، الحرارة، والفلك.
        استخدم أمثلة من الحياة اليومية.
        كن مشجعاً ومفيداً.`,
      },
    });
    return response.text || "عذراً، لم أتمكن من توليد إجابة.";
  } catch (error) {
    console.error("Error calling Gemini:", error);
    return "حدث خطأ في الاتصال بالمعلم الذكي. يرجى المحاولة لاحقاً.";
  }
};