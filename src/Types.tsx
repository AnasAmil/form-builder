

export interface InputInterface {
    id: number;
    label: string;
    required: boolean;
    name: string;
    inputType: string;
    value: string;
    placeholder: string;
    options : string[];
    icon: React.ReactNode;
    color: string;
    isDraft: boolean;
}

export interface TableInterface {
    id: number;
    label: string;
    value: string;
    name: string;
}

