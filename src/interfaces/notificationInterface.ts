
export interface NotificationInterface {
    id: number;
    name: string;
    read: boolean;
    createdAt: Date;
    updatedAt: Date;
    target?: any;
}
