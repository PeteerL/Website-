<?php
session_start();

$servername = "localhost";
$email = "root";
$password = "";
$dbname = "restaurant_reviews";

// Create connection
$conn = new mysqli($servername, $email, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);
    
    // Check if email is already registered
    $sql_check = "SELECT id FROM users WHERE email = ?";
    $stmt_check = $conn->prepare($sql_check);
    $stmt_check->bind_param("s", $email);
    $stmt_check->execute();
    $stmt_check->store_result();
    
    if ($stmt_check->num_rows > 0) {
        $message = "Email already registered. Please log in.";
    } else {
        // Insert new user
        $sql = "INSERT INTO users (email, password) VALUES (?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss", $email, $hashed_password);
        
        if ($stmt->execute()) {
            $message = "Registration successful. Please log in.";
        } else {
            $message = "Error: " . $stmt->error;
        }

        if ($stmt->execute()) {
            $message = "Registration successful. Please log in.";
            header("Location: ../login.html"); // Redirect to login.html
            exit(); // Ensure no further processing is done
        }
        
        $stmt->close();
    }
    
    $stmt_check->close();

}

$conn->close();

?>