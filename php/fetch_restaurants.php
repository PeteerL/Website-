<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "restaurant_reviews";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT name, rating, location FROM restaurants";
$result = $conn->query($sql);

$restaurants = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $restaurants[] = $row;
    }
} 

$conn->close();

header('Content-Type: application/json');
echo json_encode($restaurants);
?>
