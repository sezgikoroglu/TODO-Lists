var Filter = {
    Element: {
        form: document.getElementById("form"),
        input: document.getElementById("input"),
        submitBtn: document.getElementById("submitBtn"),
        contentContainerDiv:document.querySelector(".content-container"),
        rightBarDiv:document.querySelector(".right-bar"),
        saveBtn:document.querySelector("#saveBtn")
    },

    Status:{

        todolist:[],
    },

    Actions: {

        init:()=>{
            
            const todoList=JSON.parse(localStorage.getItem("todolist"));
            if (!todoList){
               localStorage.setItem("todolist",JSON.stringify([]));
            }else{
                Filter.Status.todolist=todoList;
                Filter.Status.todolist.forEach((item,index)=>{
                    Filter.Actions.createHTML(item,index)
                })
            }
        },

        formValidation: () => {
            
            console.log("form geldi")
            if (input.value.trim() === "") {
                alert("Your message can not be blank!")
            } else {
                
                Filter.Status.todolist.push(input.value)
                localStorage.setItem("todolist",JSON.stringify(Filter.Status.todolist))
                var arr=Filter.Status.todolist;
                var index=arr.indexOf(input.value)
                Filter.Actions.createHTML(input.value,index);
            }
        },

        createHTML: (item,index) => {
           console.log(index)
            var i=index;
            var taskDiv = `
            <div class="content">
                    <p>${item}</p>
                    <div class="items">
                        <button id="edit" onclick="Filter.Actions.edit(this,${i})" href=""><img src="images/edit-new-icon-22.png" alt=""></button>
                        <button id="delete" onclick="Filter.Actions.delete(this,${i})"  href=""> <img  src="images/waste.png" alt="">   </button>
                    </div>
                </div>
            `;
            Filter.Element.contentContainerDiv.innerHTML+=taskDiv;
            Filter.Element.input.value="";
          
        },

        edit:(e,index)=>{
            Filter.Element.submitBtn.disabled=true;
            Filter.Element.input.style.borderColor="pink"
            Filter.Element.input.value=e.parentElement.previousElementSibling.innerHTML;
            e.parentElement.previousElementSibling.innerHTML="";
           // e.parentElement.parentElement.remove();
            Filter.Element.saveBtn.style.display="inline";
            Filter.Element.saveBtn.setAttribute("onclick",`Filter.Actions.editTodo(${index})`);
            
        },

        editTodo:(index)=>{
          
            Filter.Element.contentContainerDiv.innerHTML="";
            Filter.Status.todolist[index]=Filter.Element.input.value;
            localStorage.setItem("todolist",JSON.stringify(Filter.Status.todolist));
            Filter.Status.todolist.forEach((item,index)=>
            {
                Filter.Actions.createHTML(item,index)
            })
        },
       
        delete:(e,index)=>{
            
            e.parentElement.parentElement.remove();
            Filter.Status.todolist.splice(index,1);
            localStorage.setItem("todolist",JSON.stringify(Filter.Status.todolist));

        },
    }
}

Filter.Element.submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    Filter.Actions.formValidation();
    
})

Filter.Actions.init()

