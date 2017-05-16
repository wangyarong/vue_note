var colors=['yellow','blue','green','pink'];
var app=new Vue({
    el:'#app',
    data:{
        notes:[
            {id:1,title:'便签1',content:'',top: 100, left: 120,theme:'yellow'}
        ],
        moveEvent: {state: false, index: null, position: {}}
    },
    methods:{
        md:function(i,e){
            this.moveEvent.index=i;
            this.moveEvent.position={
                x:e.offsetX,
                y:e.offsetY
            };
            this.moveEvent.state=true;
        },
        mv: function (e) {
            if (this.moveEvent.state) {
                var top = e.clientY - 80 - this.moveEvent.position.y;
                var left = e.clientX - this.moveEvent.position.x;
                this.notes[this.moveEvent.index].top = top;
                this.notes[this.moveEvent.index].left = left;
                this.save();
            }
        },
        mu:function(){
            this.moveEvent.state=false;
        },
        save:function(){
            localStorage.notes=JSON.stringify(this.notes);
        },
        addNote:function(e){
            var
                top=e.clientY - 80 - 20,
                left=e.clientX - 100,
                id=this.notes.length?(this.notes[this.notes.length-1].id+1):1,
                title='便签'+id,
                theme=colors[Math.floor(Math.random()*colors.length)];
            this.notes.push({id,title,left,top,theme});
            this.save();
        }
    },
    mounted:function(){
        document.onkeyup=(function(e){
            if(this.moveEvent.index!=null&&e.keyCode===8){
                this.notes.splice(this.moveEvent.index,1);
                this.moveEvent.index=this.notes.length?this.notes.length-1:null;
                this.save();
            }
        }).bind(this);

        if(localStorage.notes){
            this.notes=JSON.parse(localStorage.notes);
        }
    }
});