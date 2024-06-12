export declare namespace types {
    interface CreateUserRequest {
        firstName: string;
        lastName: string;
        email: string;
        userType: string[] 
    }

    interface CreateUserResponse {
        
    }

    interface ApiResponseSuccess<T> {
        message: string;
        code: number;
        timestamp?: string;
        result?: T;
        results?: T[];
    }
}