$(window).on('load', function() {

    var uid = window.location.search.slice(1, window.location.search.length).split('=')[1]
    console.log(uid)

    $.ajax({
        type: 'POST', 
        data: {
            'userid': uid
        },
        url: '../includes/projects.php', 
    })
    .done(function(data) {

        console.log("Loading projects")

        if(data) {

            console.log("Have data")
            console.log(data)

            var result = JSON.parse(data)

            if(result.length > 0) {
                document.getElementById('projects-CTA').style.display = 'none'
            }

            if(result.length > 0) {

                for(var i = 0; i < result.length; i++) {

                    var tbody = document.getElementById('tprojects')

                    var tr = document.createElement('tr')

                    var th = document.createElement('th') 
                    th.setAttribute('scope', 'row')
                    var a = document.createElement('a')
                    var label = document.createElement('label')
                    if(result[i].projectname) 
                        label.innerHTML = result[i].projectname
                    else 
                        label.innerHTML = "N/A"
                    a.appendChild(label)
                    if(result[i].projectid)
                        a.href = '/kanban.html?id=' + result[i].projectid + "&uid=" + uid
                    else
                        a.href = '/kanban.html'
                    // Include task badge
                    var spanclassattr = "badge ml-2 ";
                    if(result[i].taskcount < 3)
                        spanclassattr += "badge-success";
                    else if(result[i].taskcount < 5)
                        spanclassattr += "badge-warning";
                    else
                        spanclassattr += "badge-danger";
                    a.innerHTML += `<span class="${spanclassattr}">${result[i].taskcount}</span>`
                    th.appendChild(a)

                    var td1 = document.createElement('td')
                    if(result[i].collaborators)
                        td1.innerHTML = result[i].collaborators                     //Add collaborators 
                    else 
                        td1.innerHTML = "Just You"

                    var td2 = document.createElement('td')
                    if(result[i].modified) {
                        var date = result[i].modified.split("-")                        //Split to reformat date from psql                  
                        td2.innerHTML = date[1] + '/' + date[2] + '/' + date[0]         //Add data modified 
                    } else {
                        td2.innerHTML = "N/A"         //Add data modified 
                    }
                    var td3 = document.createElement('td')

                    btn = document.createElement('button')
                    btn.classList.add('btn')
                    btn.classList.add('btn-light')
                    btn.setAttribute('data-toggle', 'modal')
                    btn.setAttribute('data-target', '#exampleModal')
                    btn.innerHTML="..."
                    if(result[i].projectid)
                        btn.setAttribute('id', result[i].projectid)

                    td3.appendChild(btn)

                    tr.appendChild(th)
                    tr.appendChild(td1)
                    tr.appendChild(td2)
                    tr.appendChild(td3)
                    tbody.appendChild(tr)
                    
                }
            }
            
        } else {
            console.log("No data")
            document.getElementById('list-header').style.display = 'none'
            document.getElementById('list-items').style.display = 'none'
        }

    })
    .fail(function(data) {
        console.log('Projects could not be retrieved')
    })

    $('#list-items').on('click', 'button', function(e) {                //Listener for 'settings' modal 

        var projectId = this.id
        
        $('#saveChanges').on('click', function() {
            var newProjName = $('#newProjectName').val()
            var newCollab = $('#newCollabs').val()

            if(newCollab) {
                newCollab = newCollab.split(";")
                for(var i = 0; i < newCollab.length; i++)
                    newCollab[i] = newCollab[i].trim() 
            }
        
            var formData= {
                'newprojectname': newProjName,
                'collaborators': JSON.stringify(newCollab),
                'projectid': projectId
            }

            $.ajax({
                type: 'POST', 
                url: '../includes/edit-project.php', 
                data: formData,
            })
            .done(function(data) {
                console.log(data)
                var data = JSON.parse(data)
                if(data.success) {
                    if(data.duplicate == true) {
                        alert("This project already has that name! Try using a new name.")
                    } else {
                        location.reload()
                    }
                }
            })
            .fail(function(data) {
                console.log(data)
            })
            
        })

            //Delete project button for modal on project.html
        $('#deleteProject').on('click', function(e) {
            
            //Pull project ID from modal pop up 
            var formData = {
                'projectid': projectId
            }

            $.ajax({
                type: 'POST', 
                url: '../includes/delete-project.php',
                data: formData
            })
            .done(function(data) {
                //Parse data to check return status & message
                if(data) {
                    result = JSON.parse(data)
                }
                if(result.success) {
                    alert(result.message)
                    window.location.href = window.location.href
                }
                else {
                    alert("contact TJ since he messed everything up")
                }
            })
            .fail(function(data) {
                console.log(data) 
            })
        })
    })


    $.ajax({
        type: 'GET', 
        url: '../includes/appstats.php', 
    })
    .done(function(data) {

        if(data) {

            if(data) {
                var result = JSON.parse(data);
            }
            //console.log(result[0]);

            if(result) {
                if(result.length > 0) {
                    $("#stats_text").append(`
                    <small class="text-muted">Our users have created over </small>
                    ${result[0].stat_count} 
                    <br/>
                    <small class="text-muted">projects with over </small>
                    ${result[1].stat_count} 
                    <small class="text-muted">tasks</small>`)
                }
            }

        } 

    })
    .fail(function(data) {
        console.log('Stats could not be retrieved')
    })
})

