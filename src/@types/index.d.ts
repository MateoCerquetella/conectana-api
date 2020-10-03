import * as express from 'express';

interface RequestWithUserId extends express.Request {
    userId?: number;
}