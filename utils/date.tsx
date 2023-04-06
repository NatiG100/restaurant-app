export const formatDate = (d:Date)=>{
    const year:number|string = d.getFullYear();
    let month:number|string = d.getMonth()+1;
    let date:number|string = d.getDate();
    if(month<10) month = "0"+month;
    if(date<10) date = "0"+date;
    return year+'-'+month+'-'+date;
}