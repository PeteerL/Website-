<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "restaurant_reviews";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $restaurant = $_POST["restaurant"];
    $rating = $_POST["rating"];
    $comments = $_POST["comments"];

    $sql = "INSERT INTO reviews (restaurant, rating, comments) VALUES ('$restaurant', '$rating', '$comments')";

    if ($conn->query($sql) === TRUE) {
        echo "Review added successfully!";
        header("Location: ../add_review.html");
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
