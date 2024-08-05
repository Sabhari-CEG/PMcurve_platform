const getToken = () => {
    const token = localStorage.getItem('authorization');
    const expiry = localStorage.getItem('expiry');
    const now = new Date();
    const istOffset = 5 * 60 + 30; 
    const utcOffset = now.getTimezoneOffset(); 
    const istTime = new Date(now.getTime() + (istOffset + utcOffset) * 60 * 1000);
    const istTimestamp = Math.floor(istTime.getTime() / 1000);
    const token_expiry = parseInt(expiry)
    if (istTimestamp >= token_expiry || token === undefined || token === null){
        return {
            status : 404,
            message : "Token expired"
        }
    }
    return {
        status : 200,
        token : token
    }
}

export default getToken;
