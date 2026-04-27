import z from "zod";

export const questionSchema = z.object({
    question: z
        .string()
        .min(1, "Question is required")
        .max(250, "Max 250 characters allowed"),
});
export const answerSchema = z.object({
    answer: z
        .string()
        .min(1, "Answer is required")
        .max(250, "Max 250 characters allowed"),


});
export type QuestionSchemaType = z.infer<typeof questionSchema>;
export type AnswerSchemaType = z.infer<typeof answerSchema>;