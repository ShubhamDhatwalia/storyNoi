

export async function validateIdea(idea) {

  
    if( !idea || !idea.trim() ){
        return true;
    }else{
        return false;
    }

}

