import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
  summary: { type: String, required: true },
  isbn: { type: String, required: true },
  genre: [{ type: Schema.Types.ObjectId, ref: 'Genre' }]
},
{
  virtuals: {
    url: {
      get() {
        return `/catalog/book/${this._id}`;
      }
    }
  }
});

// Export model
export default mongoose.model('Book', BookSchema);
