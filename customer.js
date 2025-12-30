const mongoose= require("mongoose");
const {Schema}=mongoose;

main()
.then(()=>console.log("connected successful"))
.catch((err)=>console.log(err));

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/relationdemo');
}

const orderschema = new Schema({
item: String,
price:Number,
});

const customerschema = new Schema({
    name: String,
    orders: [
        {
            type: Schema.Types.ObjectId, //* 
            ref: "Order",
        },
    ],
});

const Order = mongoose.model("Order", orderschema);
const Customer= mongoose.model("Customer", customerschema);


const addCustomer= async ()=>{
    // let cust1= new Customer({
    //     name:"Rahul kumar"
    // });
    // let order1= await Order.findOne({item : "chips"});
    // let order2= await Order.findOne({item : "chocolate"});

    // cust1.orders.push(order1);
    // cust1.orders.push(order2);

    // let res=await cust1.save();
    // console.log(res);

    let result = await Customer.find({}).populate("orders");
    console.log(result);
}
addCustomer();



// const addOrder= async ()=>{
//     let res=await Order.insertMany([
//         {item: "samosa", price:20},
//         {item: "chips", price:30},
//         {item: "chocolate", price:50},
//     ]);
//     console.log(res);
// };

// addOrder();