var workouts = JSON.parse(localStorage.getItem("workout_list")) || [];

function data_workouts() {
    var table_data = "";
    table_data += "<tr id='table_struct'>";
    table_data += "<td>Workout Name</td>";
    table_data += "<td>Actual Time</td>";
    table_data += "<td>Total Time</td>";

    for (var i = 0; i < workouts.length; i++) {
        // var seconds = parseInt(workouts[i].seconds) - parseInt(workouts[i].completed_seconds);
        table_data += "<tr>";
        table_data += "<td>" + workouts[i].text + "</td>";
        table_data += "<td>" + workouts[i].seconds + "</td>";
        table_data += "<td>" + workouts[i].seconds + "</td>";
        table_data += "</tr>";
    }
    console.log(table_data);
    document.getElementById("table_record").innerHTML = table_data;
}


(function () {
   data_workouts();
})();