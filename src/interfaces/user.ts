import { UserType } from '@enums/user.type';

export interface User {
    id: number;
    email: string;
    type: UserType;
    createdAt: Date;
    updatedAt: Date;
}

// tslint:disable-next-line:no-empty-interface
export interface Admin extends User {}

export interface Student extends User {
    assignedTasks: any[];
    group: any;
}

// tslint:disable-next-line:no-empty-interface
export interface Professor extends User {
}
