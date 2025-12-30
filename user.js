const mongoose= require("mongoose");
const {Schema}=mongoose;

main()
.then(()=>console.log("connected successful"))
.catch((err)=>console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/relationdemo');
}

const userschema = new Schema({
username:String,
addresses: [
    {
        _id:false,
        location: String,
        city: String,
    },
],
});

const User = mongoose.model("User",userschema);

const addUsers= async ()=>{
let user1= new User({
    username:"sherlockhomles",
    addresses: [
        {
            location:"221B Baker Street",
            city:"London",

        },
    ],
});

user1.addresses.push({ location: "P32 wallstreet", city:"London"});
let result= await user1.save();
console.log(result);
};
addUsers();
