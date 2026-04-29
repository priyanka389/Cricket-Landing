const Reaction =
require("../models/Reaction");

exports.getReaction =
async (req,res)=>{
try{

let data =
await Reaction.findOne({
matchId:req.params.id
});

if(!data){
data =
await Reaction.create({
matchId:req.params.id
});
}

res.json(data);

}catch(error){
res.status(500).json({
msg:"Error"
});
}
};

exports.addReaction =
async (req,res)=>{
try{

const {
matchId,
type
} = req.body;

let data =
await Reaction.findOne({
matchId
});

if(!data){
data =
await Reaction.create({
matchId
});
}

data[type] += 1;

await data.save();

res.json(data);

}catch(error){
res.status(500).json({
msg:"Error"
});
}
};