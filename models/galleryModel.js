import mongoose from "mongoose";

const galleryAlbumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: String,
    img:[String],
},
{
    timestamps: true,
});

const GalleryAlbum = mongoose.model("GalleryAlbum", galleryAlbumSchema);
export default GalleryAlbum;