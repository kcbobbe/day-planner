$(document).ready(function() {

var queryURL = "https://numbersapi.p.rapidapi.com/" + moment().format("M/D") + "/date?fragment=true&json=true"
$.ajax({
  headers:{
    "X-RapidAPI-Host": "numbersapi.p.rapidapi.com",
    "X-RapidAPI-Key": "455b93bdd2msh6a1648e06bc3822p13c145jsn98a2d45914b8"
  },
  // data:{
  //   "month": "1",
  //   "day": "21"
  // },
  url: queryURL,
  method: "GET",
}).then(function(response) {
  console.log(response);
  $("#onThisDayYear").text("On this day in " + response.year + " : ")
  $("#onThisDayText").text(response.text)
})

var today = (moment().format('MMMM Do, YYYY'))

if (!localStorage.getItem("today")){
  localStorage.setItem("today",today);
}

if (localStorage.getItem("today") !== today ){
  localStorage.clear()
  localStorage.setItem("today", today)
}

$("#todaysDate").text((moment().format('MMMM Do, YYYY')))
$("#currentTime").text((moment().format('h:mma')))


// var plannerTable = [
//   {hour: "9:00AM", plan: ""},{hour: "10:00AM", plan: ""},{hour: "11:00AM", plan: ""},{hour: "12:00PM", plan: ""},{hour: "1:00PM", pla : ""},{hour: "2:00PM", plan: ""},{hour: "3:00PM", plan: ""},{hour: "4:00PM", plan: ""},{hour: "5:00PM", plan: ""}
// ]

if (!localStorage.getItem("plannerTable")){
  var plannerTable = [
    {hour: "9:00am", plan: ""},{hour: "10:00am", plan: ""},{hour: "11:00am", plan: ""},{hour: "12:00pm", plan: ""},{hour: "1:00pm", plan : ""},{hour: "2:00pm", plan: ""},{hour: "3:00pm", plan: ""},{hour: "4:00pm", plan: ""},{hour: "5:00pm", plan: ""}
  ]
} else{
  var plannerTable = JSON.parse(localStorage.getItem("plannerTable"))
  localStorage.setItem("plannerTable", JSON.stringify(plannerTable))
}


function createPlannerTable(){
  for (var i=0; i < plannerTable.length; i++){
    var newtr = $("<tr>");
    compareTimes(i, newtr)

    var newtd1 = $("<td>");
    newtd1.attr('class', 'time-col align-middle');
    newtd1.text(plannerTable[i].hour)
    newtr.append(newtd1);

    var newtd2 = $("<td>");
    newtd2.attr('class','text-area-col align-middle')
    var newTextArea = $("<textarea>");
    newTextArea.text(plannerTable[i].plan);
    newTextArea.attr('rows', 3)
    newTextArea.attr('class', 'planner-text-area')
    newTextArea.attr('id','textArea' + i)
    newTextArea.attr('data-id', i)
    newtd2.append(newTextArea);
    newtr.append(newtd2);

    var newtd3 = $("<td>");
    newtd3.attr('class', 'save-btn-col align-middle')
    var newButton = $("<button>");
    var newIcon = $("<i>")
    newIcon.attr('class', 'fas fa-save save-icon' )
    newButton.append(newIcon);
    newButton.attr('class','save-button  btn-lg btn-dark')
    newButton.attr('data-id', i)
    newtd3.append(newButton);
    newtr.append(newtd3);

    $("#tableBody").append(newtr);

  }
}
createPlannerTable()

function compareTimes(i, row){
  if (parseInt((moment(plannerTable[i].hour, "LT").format("H"))) === parseInt(moment().format('H'))){
    row.attr('class', 'active-row')
  } else if (parseInt((moment(plannerTable[i].hour, "LT").format("H"))) < parseInt(moment().format('H'))){
    row.attr('class', 'past-row')
  } else if (parseInt((moment(plannerTable[i].hour, "LT").format("H"))) > parseInt(moment().format('H'))){
    row.attr('class', 'future-row')
  }
}


$(".save-button").on("click", function(e){
  var j = ($(this).attr('data-id'));
  var matchingTextArea = ($(("#textArea" + j)))
  console.log(matchingTextArea.val())
  plannerTable[j].plan = (matchingTextArea.val());
  console.log(plannerTable)
  localStorage.setItem("plannerTable",JSON.stringify(plannerTable))
})

})