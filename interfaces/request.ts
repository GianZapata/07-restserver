import { IncomingHttpHeaders } from 'http';
import { Request } from 'express';
import { IUser } from '../models/user';

export interface UserRequest extends Request {
   headers : IncomingHttpHeaders & { user?: IUser }
}