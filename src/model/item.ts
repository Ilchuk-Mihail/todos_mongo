import  { model, Schema, Model, Document } from 'mongoose';

interface IItem extends Document {
  title: string;
  description: string;
  importance: string;
}

const ItemSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  importance: { type: String, required: true }
});

export const Item: Model<IItem> = model("Item", ItemSchema);
