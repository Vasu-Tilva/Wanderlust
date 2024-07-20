const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initdata = require("./data.js");

const mongo_url = "mongodb://127.0.0.1:27017/wanderlust";

main()
.then(()=>{
    console.log("connected to DB");
})
.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(mongo_url);
}

const initDB = async ()=>{
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj)=>({
        ...obj, owner: "668c317c42c611d6ecc72756",
    }));
    await Listing.insertMany(initdata.data);
    console.log("data was initialized");
}

initDB();