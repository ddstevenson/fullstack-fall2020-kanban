$(document).ready(function() {

    $('#projectform').submit(function(e) {
        e.preventDefault()
    
        var formData= {
            'projectname': $('#projectname').val()
            //'collaborators': $('textarea[name=collaborators').val()
        }
    
        $.ajax({
            type: 'POST', 
            url: '../includes/new-project.php', 
            data: formData,
        })
        .done(function(data) {
            var data = JSON.parse(data)
            if(data.success) {
                if(data.duplicate == true) {
                    alert("You already have a project by that name.")
                } else {
                    window.location.href = "http://localhost:5432/kanban.html"      //Go back to user's projects page
                }

            }
        })
        .fail(function(data) {
            console.log(data)
        })
    }
    
    )
})