let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let newbtn= document.querySelector("#New")
let msgcontainer= document.querySelector(".msg-cont");
let msg = document.querySelector("#msg");

let turnO = true;//playerx,o

const winPattern=
[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

boxes.forEach((box)=>{
    box.addEventListener("click", ()=>{
        console.log("pressed");
        if(turnO === true){
        box.innerText="O";
        turnO=false;
        }
    else{
    box.innerText="X"; 
    turnO= true; 
    }

    box.disabled=true;
    checkWinner();
})
})
const Disableboxes=()=>{
    for(let box of boxes)
    {
        box.disabled = true;
    }
}

const enableboxes=()=>{
    for(let box of boxes)
    {
        box.disabled = false;
        box.innerText= "";
        msgcontainer.classList.add("hide");
    }
}
const showWinner=(winner) =>{
    msg.innerText = `Congratulations, Winner is ${winner}` ;
    msgcontainer.classList.remove("hide");
    Disableboxes();
}
const checkWinner=() => {
    for(let pattern of winPattern)
    {
       let pos1Val =boxes[pattern[0]].innerText;
       let pos2Val =boxes[pattern[1]].innerText;
       let pos3Val =boxes[pattern[2]].innerText;

       if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
        if(pos1Val==pos2Val && pos2Val==pos3Val){
            console.log("winner", pos1Val);
        showWinner(pos1Val);
        }
    }
    }
}

const resetGame=() => {
    turnO = true;
    enableboxes();

}

newbtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);