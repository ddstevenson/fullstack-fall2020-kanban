function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile()                 //Gets user's ID, name, email, photo 
    var name = profile.getName()
    var email = profile.getEmail(); 
    var profileImage = profile.getImageUrl() 
    
    $.ajax({
        type: 'POST', 
        url: '../includes/login.php', 
        data: {
            alias: name,
            email: email, 
            imageurl: profileImage
        }, 
        success: function(data) {
            console.log(data)
            window.location.href = "http://localhost:8000/projects.html"            //Go to user's projects page
        },
        error: function(data) {
            console.log(data)
            alert("Error logging in. Please try again.")
            signOut()
        }
    })
    
}