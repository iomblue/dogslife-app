import { GoogleGenAI, Type } from "@google/genai";
import { UrgencyLevel, type SymptomAnalysis, type TrainingPlan, type TrainingGoal } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const model = 'gemini-2.5-flash';

const symptomAnalysisSchema = {
    type: Type.OBJECT,
    properties: {
        urgency: {
            type: Type.STRING,
            description: "Categorize the urgency into one of three levels: 'Immediate veterinary attention required', 'Contact your vet for advice', or 'Monitor at home, contact vet if symptoms worsen'.",
            enum: Object.values(UrgencyLevel),
        },
        potentialCauses: {
            type: Type.ARRAY,
            description: "A list of 2-4 potential causes for the symptoms, from most likely to least likely. Each cause should be a short, clear phrase.",
            items: { type: Type.STRING }
        },
        redFlags: {
            type: Type.ARRAY,
            description: "A list of 2-4 critical 'red flag' symptoms that would require immediate action if observed. Each should be a short, clear phrase.",
            items: { type: Type.STRING }
        },
        clarifyingQuestions: {
            type: Type.ARRAY,
            description: "A list of 2-4 clarifying questions a vet might ask to get more information. Frame them as if asking the pet owner.",
            items: { type: Type.STRING }
        }
    },
    required: ['urgency', 'potentialCauses', 'redFlags', 'clarifyingQuestions']
};

export const analyzeSymptoms = async (symptoms: string): Promise<SymptomAnalysis> => {
    const prompt = `
    Analyze the following pet symptoms and provide a preliminary assessment.
    You are an AI assistant providing educational information for a pet owner, not a substitute for a veterinarian.
    Symptoms: "${symptoms}"

    Structure your response in the specified JSON format.
    - Urgency: Classify the situation.
    - Potential Causes: List plausible reasons for the symptoms.
    - Red Flags: List critical symptoms to watch for that necessitate immediate vet action.
    - Clarifying Questions: What would a vet want to know more about?
  `;

    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: symptomAnalysisSchema,
            },
        });

        const jsonStr = response.text.trim();
        const jsonText = jsonStr.replace(/^```json\n?/, '').replace(/```$/, '');
        const result = JSON.parse(jsonText) as SymptomAnalysis;
        
        if (!Object.values(UrgencyLevel).includes(result.urgency)) {
            console.warn(`Unexpected urgency level: ${result.urgency}. Defaulting to 'Monitor'.`);
            result.urgency = UrgencyLevel.MONITOR;
        }

        return result;
    } catch (error) {
        console.error("Error analyzing symptoms:", error);
        throw new Error("Failed to get analysis from AI. The model may be overloaded. Please try again later.");
    }
};


const trainingPlanSchema = {
    type: Type.OBJECT,
    properties: {
        goal: { type: Type.STRING },
        duration: { type: Type.STRING, description: "e.g., '4 Weeks'" },
        steps: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    title: { type: Type.STRING, description: "e.g., 'Week 1: Luring the Sit'" },
                    description: { type: Type.STRING, description: "A few sentences explaining the step." },
                    duration: { type: Type.STRING, description: "e.g., 'Week 1'" }
                },
                required: ['title', 'description', 'duration']
            }
        }
    },
    required: ['goal', 'duration', 'steps']
};


export const generateTrainingPlan = async (goal: TrainingGoal, breed: string, age: string): Promise<TrainingPlan> => {
    const goalMap = {
        sit: 'teach the dog to sit',
        stay: 'teach the dog to stay',
        come: 'teach the dog to come when called',
        leash: 'improve loose-leash walking',
    };

    const prompt = `
    Create a simple, positive-reinforcement-based dog training plan.
    Goal: ${goalMap[goal]}.
    Dog Breed: ${breed || 'unknown'}.
    Dog Age: ${age || 'unknown'}.

    The plan should be broken down into weekly steps over approximately 4 weeks.
    For each step, provide a title, a brief description of the exercise, and the duration (e.g., 'Week 1').
    Keep descriptions concise and easy for a beginner to understand.
    Structure your response in the specified JSON format.
  `;

    try {
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: trainingPlanSchema,
            },
        });
        
        const jsonStr = response.text.trim();
        const jsonText = jsonStr.replace(/^```json\n?/, '').replace(/```$/, '');
        const result = JSON.parse(jsonText) as TrainingPlan;

        return result;
    } catch (error) {
        console.error("Error generating training plan:", error);
        throw new Error("Failed to generate a training plan. Please try again.");
    }
};
