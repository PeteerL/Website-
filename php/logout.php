<?php
session_start();
session_destroy();
header("Location: logout.html?message=" . urlencode("You have been logged out successfully."));
exit();
?>
