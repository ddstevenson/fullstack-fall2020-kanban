<?php include('./includes/config.php');?>
<!DOCTYPE html>
<html>
<head>
    <title>Landing Page</title>
    <meta name="google-signin-client_id" content="666932379090-0da4ab3rs9u7jmvn7iu2iv7au4p98ljk.apps.googleusercontent.com">
    <script src="https://apis.google.com/js/platform.js" async defer></script>
    <script src="./scripts/login.js"></script>
    <script src="./scripts/logout.js"></script>
    <script   src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
</head>
<body>
    <div class="g-signin2" data-onsuccess="onSignIn"></div>
    <a href="#" onclick="signOut();">Sign out</a>
    
</body>
<script> 

</script> 
    <!-- Just for practice --> 
</html>