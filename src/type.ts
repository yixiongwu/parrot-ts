export interface Result<T> {
    success: string;
    data: T;
    error: string;
}

export interface Question {
    id: number;
    title: string;
    content: string;
    upvote: number;
    downvote: number
}

export interface Answer {
    id: number;
    questionId: number;
    content: string;
    createDate: Date;
    updateDate: Date;
    upvote: number;
    downvote: number
}