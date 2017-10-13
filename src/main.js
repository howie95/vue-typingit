const typingIt = {}

typingIt.install = function (Vue){
    const i = {
        texts:[],
        el:"",
        isWriting:false,
        isLoop:false,
        index:0,
        speed:50,
        spacebefore:500,
        spaceafter:2000,
    }
    isEqual = function(array){
        if(i.texts.length==0 && array.length==0){
            return true
        }else{
            return !array.some(function(e){
                return e !== i.texts[0]
            })
        }
    }
    delText = function(){
        if(i.el.innerHTML.length>0){
            i.el.innerHTML = i.el.innerHTML.substr(0, i.el.innerHTML.length - 1)
            setTimeout(delText, i.speed)
            i.isWriting=false
        }else{
            i.isWriting=true
            setTimeout(writeText, i.spacebefore)
        }
    }
    writeText = function(){
        if(i.isWriting==true){
            if(i.texts.length>=1){
                if(i.el.innerHTML.length<i.texts[i.index].length){
                    i.el.innerHTML=i.texts[i.index].slice(0, i.el.innerHTML.length+1)
                    setTimeout(writeText, i.speed)
                }else{
                    if(i.index<i.texts.length-1){
                        i.index++
                        setTimeout(delText, i.spaceafter)
                    }else{
                        if(i.isLoop===true){
                            i.index=0
                            setTimeout(delText, i.spaceafter)
                        }else{
                            return
                        }
                    }
                }
            }else{
                return
            }
        }else{
            return
        }
    }
    Vue.directive('typingit',{
        bind : function(el,binding){
            //Init config
            if(typeof binding.value.speed !== "undefined"){
                if(typeof binding.value.speed !== "number"){
                    console.warn("Vue-typingit - Speed config must be a number(ms)!")
                }else{i.speed=binding.value.speed}
            }
            if(typeof binding.value.spaceafter !== "undefined"){
                if(typeof binding.value.spaceafter !== "number"){
                    console.warn("Vue-typingit - spaceafter config must be a number(ms)!")
                }else{i.spaceafter=binding.value.spaceafter}
            }
            if(typeof binding.value.spacebefore !== "undefined"){
                if(typeof binding.value.spacebefore !== "number"){
                    console.warn("Vue-typingit - spacebefore config must be a number(ms)!")
                }else{i.spacebefore=binding.value.spacebefore}
            }
            if(typeof binding.value.loop !== "undefined"){
                if(typeof binding.value.loop !== "boolean"){
                    console.warn("Vue-typingit - loop config must be a boolean(true or false)!")
                }else{i.isLoop=binding.value.loop}
            }
            i.el=el
            //If texts
            if(binding.value.texts){
                if(binding.value.texts.length !== 0){
                    if(i.el.innerHTML.length !== 0){
                        i.texts=binding.value.texts.concat()
                        setTimeout(delText, i.spaceafter)
                    }else{
                        delText
                    }
                }else{
                    return
                }
            }else{
                console.warn("Vue-typingit element's data must has a texts list!")
            }
        },
        update: function(el,binding){
            //Config Changes
            if(typeof binding.value.speed !== "undefined"){
                if(typeof binding.value.speed !== "number"){
                    console.warn("Vue-typingit - Speed config must be a number(ms)!")
                }else{i.speed=binding.value.speed}
            }
            if(typeof binding.value.spaceafter !== "undefined"){
                if(typeof binding.value.spaceafter !== "number"){
                    console.warn("Vue-typingit - spaceafter config must be a number(ms)!")
                }else{i.spaceafter=binding.value.spaceafter}
            }
            if(typeof binding.value.spacebefore !== "undefined"){
                if(typeof binding.value.spacebefore !== "number"){
                    console.warn("Vue-typingit - spacebefore config must be a number(ms)!")
                }else{i.spacebefore=binding.value.spacebefore}
            }
            if(typeof binding.value.loop !== "undefined"){
                if(typeof binding.value.loop !== "boolean"){
                    console.warn("Vue-typingit - loop config must be a boolean(true or false)!")
                }else{i.isLoop=binding.value.loop}
            }
            //Texts Changes
            if(isEqual(binding.value.texts)){
                return
            }else{
                i.texts = binding.value.texts.concat()
                setTimeout(delText, i.spaceafter)
            }
        }

    })
}
module.exports = typingIt