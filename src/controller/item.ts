import { Request, Response, NextFunction } from 'express'
import {Item} from '../model/item'
import mongoose from "mongoose";

export default {
    async createItem(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {title, description, importance} = req.body
            const newItem = Item.create({
                    _id: new mongoose.Types.ObjectId(),
                    title,
                    description,
                    importance
                }
            )
            res.status(201).json(newItem)
        } catch(err) {
            next(err)//create middleware - handle error functions)
        }
    }
}


