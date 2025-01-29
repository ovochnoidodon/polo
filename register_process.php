<?php
header('Content-Type: application/json');

// Получение данных из формы
$data = json_decode(file_get_contents('php://input'), true);
$user = $data['username'];
$email = $data['email'];
$pass = $data['password'];

// Хэширование пароля
$hashed_pass = password_hash($pass, PASSWORD_DEFAULT);

// Путь к файлу с данными пользователей
$users_file = 'users.txt';

// Чтение существующих пользователей из файла
if (file_exists($users_file)) {
    $users_data = file_get_contents($users_file);
    $users = json_decode($users_data, true);
} else {
    $users = [];
}

// Проверка уникальности имени пользователя и email
foreach ($users as $user_info) {
    if ($user_info['username'] === $user || $user_info['email'] === $email) {
        echo json_encode(['success' => false, 'message' => 'Имя пользователя или email уже заняты.']);
        exit;
    }
}

// Добавление нового пользователя
$new_user = [
    'username' => $user,
    'email' => $email,
    'password' => $hashed_pass
];

$users[] = $new_user;

// Сохранение всех пользователей обратно в файл
file_put_contents($users_file, json_encode($users));

echo json_encode(['success' => true, 'message' => 'Регистрация успешна!']);
?>