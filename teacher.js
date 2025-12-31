const mongoose= require("mongoose");
const {Schema}=mongoose;

main()
.then(()=>console.log("connected successful"))
.catch((err)=>console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/relationdemo');
}

const teacherSchema = new Schema({
    name:String,
    subject:String,
    salary: Number,
});

const studentSchema= new Schema({
    studentName:String,
    rollNo:Number,
    teacher:
        {
            type: Schema.Types.ObjectId,
            ref: "Teacher",
        },
    
});

const Teacher= mongoose.model("Teacher",teacherSchema);
const Student= mongoose.model("Student", studentSchema);

let AddData= async ()=>{
    let teacher2= new Teacher({
        name:"jitendra sir",
        subject:"mathematics engineering",
        salary:100000,
    });

    // let res= await teacher1.save();
    // console.log(res);

    let studentData1= new Student({
    studentName:"goldie",
    rollNo: 32,
});

  studentData1.teacher = teacher2._id;
await teacher2.save();
await studentData1.save();
let res= await Student.find({}).populate("teacher");
console.log(res);
};
 AddData();
// let delData= async ()=>{
//     await Teacher.findByIdAndDelete("6954bddefc8b340b9a4233e3");
//    await Student.findByIdAndDelete('6954bddefc8b340b9a4233e4');
// }
// delData();
