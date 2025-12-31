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
    salary: String
});

const studentSchema= new Schema({
    studentName:String,
    rollNo:Number,
    teacher:[
        {
            type: Schema.Types.ObjectId,
            ref: "Teacher",
        },
    ],
});

const Teacher= mongoose.model("Teacher",teacherSchema);
const Student= mongoose.model("Student", studentSchema);

let AddData= async ()=>{
    let teacher1= new Teacher({
        name:"mahendre sir",
        subject:"electronic engineering",
        salary:50000,
    });

    // let res= await teacher1.save();
    // console.log(res);

    let studentData= new Student({
    name:"aman",
    rollNo: 8,
});
// studentData.Student= teacher1;
// teacher1.save();
// studentData.save();
let res= await Student.find({}).populate("teacher");
console.log(res);
};
AddData();
