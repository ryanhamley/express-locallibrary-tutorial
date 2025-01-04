import mongoose from 'mongoose';
import { DateTime } from 'luxon';

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
},
{
  virtuals: {
    lifespan: {
      get() {
        const date_of_birth_formatted = this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';
        const date_of_death_formatted = this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : '';
        return this.date_of_birth ? `(${date_of_birth_formatted} - ${date_of_death_formatted})` : '';
      }
    },
    name: {
      get() {
        let fullname = '';
        if (this.first_name && this.family_name) {
          fullname = `${this.family_name}, ${this.first_name}`;
        }

        return fullname;
      }
    },
    url: {
      get() {
        return `/catalog/author/${this._id}`;
      }
    }
  }
});

// Export model
export default mongoose.model('Author', AuthorSchema);
