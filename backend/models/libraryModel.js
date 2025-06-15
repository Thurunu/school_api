import mongoose from 'mongoose';

const librarySchema = new mongoose.Schema(
    {
        category_id: {
            type: String,
            required: true,
            unique: true,
            default: () => Math.floor(Math.random() * 10000),
        },
        category: {
            type: String,
            required: true,
        },
        books: [
            {
                book_id: {
                    type: Number,
                    default: () => Math.floor(Math.random() * 100000),
                },
                book_name: {
                    type: String,
                    required: true,
                },
                book_img: {
                    type: String,
                    required: true,
                },
                book_download_url: {
                    type: String,
                    required: true,
                },
            }
        ],
    },
    {
        timestamps: true,
    }
);

const Library = mongoose.model('Library', librarySchema);
export default Library;