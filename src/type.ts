export type Result<T> = {
    success: string;
    data: T;
    error: string;
}

export type Question = {
    id: number;
    title: string;
    content: string;
    upvote: number;
    downvote: number;
    answers: Answer[];
}

export type Answer = {
    id: number;
    questionId: number;
    content: string;
    createDate: Date;
    updateDate: Date;
    upvote: number;
    downvote: number;
}