import { getSongs } from '@/dataManager/song';
import { RequestHandler } from 'express';

export const querySongs: RequestHandler = (req, res, next) => {
    console.log(`[querySongs] sending: ${JSON.stringify(getSongs(), null, 4)}`);
    res.json(getSongs());
}