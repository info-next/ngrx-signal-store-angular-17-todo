export type Todo = {
    id: string;
    title: string;
    completed: boolean;
    description?: string;
    created_at?: Date;
    updated_at?: Date;
}