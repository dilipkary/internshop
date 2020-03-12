function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;}
    return true;}
var list=[{id:1,value:"h1"},{id:1,value:"h2"}];
function getList(item) {
    var items = '<h1>'+item.id+'</h1>'+'<h2>'+item.value+'</h2>';
    return items;}
if(isEmpty(list)){
    document.getElementById("demo").innerHTML = '<h2>Search items from various websites</h2>'}
else {
    document.getElementById("demo").innerHTML = list.map(getList);}