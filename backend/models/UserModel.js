import mongoose from "mongoose";

const UserModel = mongoose.Schema({

    username : {
        type : String,
        required : [true, "Username is required"],
        unqiue : [true , "Username already exists"],
    },

    email : {
        type : String,
        required : [true, "Email is required"],
        unique : [true, "Email already exists"],
    },

    password : {
        type : String,
        required : [true, "Password is required"],
    },

},
{
    timestamp : true
}
);

UserModel.pre('save', function(next) {
    this.username = this.username.toLowerCase();
    next();
});

export default mongoose.model("User", UserModel);
