/* Global Variables */
const link = "http://api.openweathermap.org/data/2.5/weather?zip=";
const key = "&appid=c5f68e79c780b6d1c76537c396ad01c8";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

//function that updates the html elements with the api and user data
const update = async () => {
  const req = await fetch("http://localhost:8000/all");
  try {
    const allData = await req.json();
    document.getElementById("date").innerHTML = allData.date;
    document.getElementById("temp").innerHTML = allData.temperature;
    document.getElementById("content").innerHTML = allData.userResponse;
  } catch (error) {
    console.log("error:", error);
  }
};
//function that fetches the data from the api
const ApiFetch = async (ApiUrl) => {
  const res = await fetch(ApiUrl + "&units=metric");
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error:", error);
  }
};
const postData = async (url = "", data = {}) => {
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const newData = await req.json();
    return newData;
  } catch (error) {
    console.log("error:", error);
  }
};
var btn = document.getElementById("generate");
btn.addEventListener("click", performAction);
//function intialized at the button click to intialize the promises
function performAction(e) {
  var userResponse = document.getElementById("feelings").value;
  var zip = document.getElementById("zip").value;
  const ApiUrl = link + zip + key;

  ApiFetch(ApiUrl)
    .then(function (data) {
      postData("http://localhost:8000/projectData", {
        temperature: data.main.temp,
        date: newDate,
        userResp: userResponse,
      });
    })
    .then(function (newData) {
      update();
    });
}
