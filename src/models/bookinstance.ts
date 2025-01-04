import mongoose from 'mongoose';
import { DateTime } from 'luxon';

const Schema = mongoose.Schema;

const BookInstanceSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  imprint: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: [
        'Available',
        'Maintenance',
        'Loaned',
        'Reserved'
    ],
    default: 'Maintenance'
  },
  due_back: { type: Date, default: Date.now }
},
{
  virtuals: {
    due_back_formatted: {
      get() {
        return DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED);
      }
    },
    due_back_yyyy_mm_dd: {
      get() {
        return DateTime.fromJSDate(this.due_back).toISODate(); // format 'YYYY-MM-DD'
      }
    },
    url: {
      get() {
        return `/catalog/bookinstance/${this._id}`;
      }
    }
  }
});

// Export model
export default mongoose.model('BookInstance', BookInstanceSchema);
