const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    }
}, {
    timestamps: true
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);

//internally in mongodb models name is connvertd to lowercase and pluralel.