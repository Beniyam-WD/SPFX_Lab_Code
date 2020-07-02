var  myfunctions  =   {    
    getDate:   function()  {        
        console.log(Date());        
        return  "Current Date and time printed";    
    },
    addval:   function(val1, val2)  {
        console.log(val1 + val2);
        return "valueadded";
    }

}

module.exports  = myfunctions;