const mongoose = require('mongoose');

//Subject Schema for storing Subjects
const SubjectSchema = new mongoose.Schema({
    name: {
        type : String,
        required : (true,'Subject name is required'),
        trim : true
    },
    marks: {
        type : Number,
        required : (true,'Marks should be entered'),
        min : (0,'Marks must be non negative values'),
        max : (100,'marks must not exceed 100')
    },
    maxMarks:{
        type :Number,
        default : 100
    },
});

//Student Schema for storing students details
const StudentSchema = new mongoose.Schema({
    name : {
        type: String,
        required : (true,'Student name must be entered'),
        trim : true
    },
    rollno : {
        type: String,
        required : (true,'Roll no must be entered'),
        trim : true,
        unique : true,
        uppercase : true
    },
    class: {
        type : String,
        required : (true,'Class must be entered'),
        trim : true
    },
    subjects = [SubjectSchema],
    createdby:{
        type : mongoose.Schema.Types.ObjectId,
        ref  : 'User',
        required : true
    }

},
{
    timestamps : true,
    toJSON : {virtuals : true}
});

StudentSchema.virtual('totalMarks').get(function(){
    return this.subjects.reduce((acc,subject) => acc + subject ,0 );
})

StudentSchema.virtual('Percentage').get(function(){
    if(this.subject.length === 0) return 0;
    const total = this.subjects.reduce((acc,s) => acc + s.marks,0);
    const maxTotal = this.subjects.reduce((acc,s) => acc + s.maxMarks,0);
    return ((total/maxTotal) * 100).toFixed(2);
})

StudentSchema.virtual('grade').get(function(){
    const pst = parseFloat(this.Percentage);
    if(pst >= 90) return 'O';
    if(pst >= 80) return 'A+';
    if(pst >= 70) return 'A';
    if(pst >= 60) return 'B+';
    if(pst >= 50) return 'B';
    if(pst >= 45) return 'C';
    else return 'U';
})

const Student = mongoose.model('Student',StudentSchema);

module.exports =student;