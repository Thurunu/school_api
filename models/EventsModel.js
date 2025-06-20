import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
    {title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        // default: () => new Date(),
        required: true,
    },
},
{
    timestamps: true,
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
