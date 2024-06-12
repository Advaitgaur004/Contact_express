import mongoose from "mongoose";

const contactSchema = mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : [true, "User is required"],
        ref : "User",
    },
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    phone: {
        type: String,
        unique: true,
        required: [true, "Phone number is required"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
    },
},
    {
        timestamps: true,
    }
);

contactSchema.pre('save', function(next) {
    this.name = this.name.toLowerCase();
    next();
});

export default mongoose.model("Contact", contactSchema)
