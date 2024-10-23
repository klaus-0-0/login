import mongoose from 'mongoose';
import { z } from 'zod'

const itemSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true }
});

const data = mongoose.model('data', itemSchema);

export default data;
