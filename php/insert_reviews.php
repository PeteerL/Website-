<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "restaurant_reviews";

// Crearea conexiunii
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificarea conexiunii
if ($conn->connect_error) {
    die("Conexiune eșuată: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $restaurant_id = $_POST['restaurant'];
    $rating = $_POST['rating'];
    $comments = $_POST['comments'];

    $stmt = $conn->prepare("INSERT INTO reviews (restaurant_id, rating, comments) VALUES (?, ?, ?)");
    $stmt->bind_param("iis", $restaurant_id, $rating, $comments);

    if ($stmt->execute()) {
        echo "Recenzia a fost adăugată cu succes.";
    } else {
        echo "Eroare: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>
