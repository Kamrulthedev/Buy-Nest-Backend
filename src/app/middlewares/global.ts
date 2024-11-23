import * as express from 'express';

interface User {
    id: string;
    role: string;
    // other properties
}


declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

