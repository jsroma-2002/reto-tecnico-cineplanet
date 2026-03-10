import mongoose, { Schema, type Document } from "mongoose";

export interface IPremiere extends Document {
  imageUrl: string;
  title: string;
  description: string;
}

const premiereSchema = new Schema<IPremiere>(
  {
    imageUrl: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret: Record<string, unknown>) {
        ret.id = String(ret._id);
        delete ret._id;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
      },
    },
  },
);

export const Premiere = mongoose.model<IPremiere>("Premiere", premiereSchema);
