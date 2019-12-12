    
const initialState = {
    username : ""
}

function reducer(state = initialState , action){
    switch(action.type){    
        case "LoginTrue":{    
            return {
                username : action.username
            } 
            break;        
        }
       
        default:{
            return initialState;
        }
    }
}
export default reducer;