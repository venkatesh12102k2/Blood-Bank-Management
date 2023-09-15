const testController = (req,res)=>{
    res.status(200).send({
        message:"Now i am using MVC pattern...!!!",
        success:true,
    });
};

module.exports = {testController};