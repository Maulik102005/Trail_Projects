document.addEventListener("DOMContentLoaded",function()
{

    const searchButton = document.getElementById("search-btn");
    const usernameInput= document.getElementById("user-input");
    const statsContainer= document.querySelector(".stat-container");
    const easyProgressCircle= document.querySelector(".easy-progress");
    const easyLabel= document.getElementById("easy-label");
    const mediumLabel= document.getElementById("medium-label");
    const mediumProgressCircle= document.querySelector(".medium-progress");
    const hardLabel= document.getElementById("Hard-label");
    const hardProgressCircle= document.querySelector(".Hard-progress");
    

    function validUsername(username) {
        if(username.trim()===""){
            alert("Username should not be empty");
            return false;
        }
            const regex = /^[a-zA-Z0-9_]{1,15}$/
            const isMatching = regex.test(username);
            if(!isMatching)
            {
                alert("Invalid Username");
            }
                return isMatching;
    }

    async function fetchUserDeatils(username){
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
;
        try{
            searchButton.textContent = "Searching...";
            searchButton.disabled =true;
            const response = await fetch(url);
            if(!response.ok){
                throw new Error("Unable to fetch details");
            }

            const data =  await response.json();
            console.log("Logging data: ", data);
             displayUserData(data);

            }

            catch(error){
                statsContainer.innerHTML = `<p>No data found</p>`
            }

            finally{
                searchButton.textContent = "Search";
                searchButton.disabled = false;

            }

            
        }

function updateProgress(solved, total, label,circle)
{
    const progressDegree = (solved / total) * 180;
    circle.style.setProperty("--progress-degree", `${progressDegree}%`);
    label.textContent= `${solved}/${total}`;
}   
function displayUserData(parsedData)
    {
        const totalQues = parsedData.totalQuestions;
        const totalEasyQues = parsedData.totalEasy;
        const totalMediumQues = parsedData.totalMedium;
        const totalHardQues = parsedData.totalHard;
       

        const solvedTotalQues= parsedData.totalSolved;
        const solvedTotalEasyQues= parsedData.easySolved;
        const solvedTotalMediumQues= parsedData.mediumSolved;
        const solvedTotalHardQues= parsedData.hardSolved;
    
     updateProgress(solvedTotalEasyQues, totalEasyQues, easyLabel, easyProgressCircle);
    updateProgress(solvedTotalMediumQues, totalMediumQues, mediumLabel, mediumProgressCircle);
     updateProgress(solvedTotalHardQues, totalHardQues, hardLabel, hardProgressCircle);
    }
searchButton.addEventListener('click', function()
{
    const username = usernameInput.value; 
    console.log("logging username", username);
    if(validUsername(username))
        fetchUserDeatils(username);


})



})

