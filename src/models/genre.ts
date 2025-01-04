import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const GenreSchema = new Schema({
  name: { type: String, required: true, minLength: 3, maxLength: 100 },
  checked: { type: String, default: 'false' }
},
{
  virtuals: {
    url: {
      get() {
        return `/catalog/genre/${this._id}`;
      }
    }
  }
});

// Export model
export default mongoose.model('Genre', GenreSchema);
