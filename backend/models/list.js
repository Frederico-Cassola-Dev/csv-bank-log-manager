const mongoose = require("mongoose");

const List = new mongoose.Schema({
    fileName: {
        type: String,
        required: true,
        unique: true
    },
    fileSize: {
        type: Number,
        required: true
    },
    fileType: {
        type: String,
        required: true
    },
    data: {
        type: Array,
        required: true
    },
    resumeListData: {
        type: Array,
        required: true
    },
    dataDate: {
        type: String,
        required: true
    },
    uploadDate: {
        type: Date,
        required: true
    }
},{collection: 'Lists'});

module.exports = mongoose.model("List", List);
