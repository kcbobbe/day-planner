$(document).ready(function() {

$("#todaysDate").text(moment().format('MMMM Do YYYY'))
console.log('hi')


var plannerTable = [
  {hour: "9:00AM", plan: ""},{hour: "10:00AM", plan: ""},{hour: "11:00AM", plan: ""},{hour: "12:00PM", plan: ""},{hour: "1:00PM", pla : ""},{hour: "2:00PM", plan: ""},{hour: "3:00PM", plan: ""},{hour: "4:00PM", plan: ""},{hour: "5:00PM", plan: ""}
]



function createPlannerTable(){
  for (var i=0; i < plannerTable.length; i++){
    var newtr = $("<tr>");

    var newtd1 = $("<td>");
    newtd1.text(plannerTable[i].hour)
    newtr.append(newtd1);

    var newtd2 = $("<td>");
    newtd2.attr('class','text-area-col')
    var newTextArea = $("<textarea>");
    newTextArea.text(plannerTable[i].plan);
    newTextArea.attr('rows', 3)
    newTextArea.attr('class', 'planner-text-area')
    newTextArea.attr('id','textArea' + i)
    newTextArea.attr('data-id', i)
    newtd2.append(newTextArea);
    newtr.append(newtd2);

    var newtd3 = $("<td>");
    var newButton = $("<button>");
    newButton.text("save");
    newButton.attr('class','save-button')
    newButton.attr('data-id', i)
    newtd3.append(newButton);
    newtr.append(newtd3);

    $("#tableBody").append(newtr);

  }
}
createPlannerTable()

$(".save-button").on("click", function(e){
  var j = ($(this).attr('data-id'));
  // console.log($(this).attr("data-id"), $(":nth-of-type(" + j + ")"))
  var matchingTextArea = ($(("#textArea" + j)))
  console.log(matchingTextArea.val())
  plannerTable[j].plan = (matchingTextArea.val());
  console.log(plannerTable)
})

})