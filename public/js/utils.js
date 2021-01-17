HTMLElement.prototype.attr = function (a){
    try{
        return this[a];
    }catch(e){
        return "Invalid attribute";
    }
}
HTMLElement.prototype.hide = function (){
    if(this.style.display != "none") return this.style.display = "none";
}
HTMLElement.prototype.show = function(){
    if(this.style.display != "block") return this.style.display = "block";
}
HTMLElement.prototype.click = function(callback){
    this.addEventListener('click', callback);
}
$ = (q) => {
    var e = {};
    if(typeof q == "string"){
        if(q.startsWith('.')){
            e = document.querySelectorAll(q);
            if(e){
                if (e.length > 1){
                    return e;
                }else{
                    return e[0];
                }
            }
        }else if(q.startsWith('#')){
            e = document.querySelector(q);
            if(e) return e;
        }
    }else{
        return q;
    }
}