export enum ExperimentType {
  HOME = 'HOME',
  MEASUREMENT = 'MEASUREMENT', // Unit 1: Physics & Measurement
  MOTION = 'MOTION', // Unit 1: Motion (Free Fall)
  FLUIDS = 'FLUIDS', // Unit 2: Fluids (Archimedes)
  GAS_LAWS = 'GAS_LAWS', // Unit 3: Heat (Gas Laws)
  AI_TUTOR = 'AI_TUTOR' // Gemini Assistant
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}