const handlerFunction = {


    addUser: (req, res) => {
        console.log(req.body);
        res.send("User added successfully");
    },
    

}


export default handlerFunction  