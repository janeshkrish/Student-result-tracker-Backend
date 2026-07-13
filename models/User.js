const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name :{
        required : true ['Enter your name'],
        type : String,
        trim : true
    },
    email :{
        required : true ['Enter your email'],
        type : String,
        trim : true,
        unique : true
    },
    password :{
        required : true ['Enter your password'],
        type :String,
        minLength : [6,'Must be at least 6 characters']
    },
    role :{
        type : String,
        enum : ['student','teacher'],
        default : 'teacher'
    }
    
},
{
    timestamps : true,
}
)

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
})

userSchema.methods.matchPassword = async function(enteredPassword){
    const bcrypt = require('bcryptjs');
    return await bcrypt.compare(enteredPassword,this.password);
}

const User = mongoose.model('User',userSchema);

module.export = User;