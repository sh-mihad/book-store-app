export const getDynamicArr = (arr,setter,checkValue)=>{
    console.log(checkValue);
    const dynamicArr = []
    arr.forEach((item)=>{
        if(dynamicArr.some(itm=>itm?.checkValue === item?.checkValue) === false){
            dynamicArr.push(item?.checkValue)
        }
      })
    
     return setter(dynamicArr)
}