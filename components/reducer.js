    
const initialState = {
    CartNumber: 0,
}

function reducer(state = initialState , action){

   
    switch(action.type){    
       case "LoginTrueUser":{
           //localStorage.setItem("CartNumber",action.CartNumber);
           return {
                CartNumber:action.CartNumber
           } 
           break;        
       }
       default:{
           return initialState;
       }
   }
}
export default reducer;