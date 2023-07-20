
export interface InputInterface {
    id: number;
    label: string;
    required: boolean;
    name: string;
    type: string;
    placeholder: string;
    icon: React.ReactNode;
    color: string;
    isDraft: boolean;
}