var workouts = JSON.parse(localStorage.getItem("workout_list")) || [];
function data_workouts() {
    var table_data = "";
    table_data += "<tr id='table_struct'>";
    table_data += "<td>Workout Name</td>";
    table_data += "<td>Actual Time</td>";
    table_data += "<td>Total Time</td>";

    for (var i = 0; i < workouts.length; i++) {
        var seconds = parseInt(workouts[i].seconds);
        var completed_seconds = parseInt(workouts[i].completed_seconds);
        if (workouts[i].text != "Rest") {

            table_data += "<tr>";
            table_data += "<td>" + workouts[i].text + "</td>";
            table_data += "<td>" + show_time(completed_seconds) + "</td>";
            table_data += "<td>" + show_time(seconds) + "</td>";
            table_data += "</tr>";
        }
    }
    console.log(table_data);
    document.getElementById("table_record").innerHTML = table_data;
}

function show_time(seconds) {
    let hours = Math.floor(seconds / 3600);
    if (hours < 10) {
        hours = "0" + hours
    }
    let mins = Math.floor((seconds % 3600) / 60);
    if (mins < 10) {
        mins = "0" + mins
    }
    let secs = seconds % 60;
    if (secs < 10) {
        secs = "0" + secs
    }
    return hours + " : " + mins + " : " + secs;
}

(function () {
    data_workouts();
})();