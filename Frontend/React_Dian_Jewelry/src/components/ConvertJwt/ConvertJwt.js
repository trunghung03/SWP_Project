function ConvertJwt(){
    const fwtDecode =jwtDecode(res.data.token);
                localStorage.setItem("convertedCode", JSON.stringify(fwtDecode));
                console.log(localStorage.getItem("convertedCode")); 
                const storeConvertedCode = localStorage.getItem("convertedCode");
                if(storeConvertedCode){
                    const decodedToken = JSON.parse(storeConvertedCode);
                    const role = decodedToken.role;
                    console.log(role);
                }
    return(
        <></>
    );
};
export default ConvertJwt;