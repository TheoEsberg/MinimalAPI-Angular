export interface Book{
    id: number;
    title: string;
    description: string;
    author: string;
    genre: string;
    year: Date | null;
    isAvailable: boolean;
    showDetails?: boolean; // Optional property for tracking expanded/collapsed state
}