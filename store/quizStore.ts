import { create } from 'zustand';

export interface Question {
    question: string;
    options: string[];
    answer: string;
}

interface QuizState {
    // Quiz State
    questions: Question[];
    currentQuestion: number;
    score: number;
    userAnswers: (string | null)[];
    setQuestions: (questions: Question[]) => void;
    selectAnswer: (answer: string) => void;
    nextQuestion: () => void;
    reset: () => void;
    // Quiz Configuration
    questionCount: number;
    difficulty: string;
    setQuestionCount: (count: number) => void;
    setDifficulty: (difficulty: string) => void;
}

const initialState = {
    questions: [],
    currentQuestion: 0,
    score: 0,
    userAnswers: [],
    questionCount: 5,
    difficulty: 'Normal',
};

export const useQuizStore = create<QuizState>((set, get) => ({
    ...initialState,
    setQuestions: (questions) => {
        set({
            questions,
            currentQuestion: 0,
            score: 0,
            userAnswers: new Array(questions.length).fill(null)
        });
    },
    selectAnswer: (answer) => {
        const { currentQuestion, questions, userAnswers } = get();
        const newAnswers = [...userAnswers];
        newAnswers[currentQuestion] = answer;

        // **FIX:** Recalculate the score from scratch to ensure accuracy when answers are changed.
        const currentScore = newAnswers.reduce((acc, ans, index) => {
            if (questions[index] && ans === questions[index].answer) {
                return acc + 1;
            }
            return acc;
        }, 0);

        set({
            userAnswers: newAnswers,
            score: currentScore
        });
    },
    nextQuestion: () => {
        set((state) => ({ currentQuestion: state.currentQuestion + 1 }));
    },
    reset: () => {
        set({
            questions: [],
            currentQuestion: 0,
            score: 0,
            userAnswers: [],
        });
    },
    setQuestionCount: (count) => set({ questionCount: count }),
    setDifficulty: (difficulty) => set({ difficulty }),
}));

