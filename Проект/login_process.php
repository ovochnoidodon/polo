<?php
header('Content-Type: application/json');

// Получение данных из формы
$data = json_decode(file_get_contents('php://input'), true);
$user = $data['username'];
$pass = $data['password'];

// Путь к файлу с данными пользователей
$users_file = 'users.txt';

// Чтение данных пользователей из файла
if (file_exists($users_file)) {
    $users_data = file_get_contents($users_file);
    $users = json_decode($users_data, true);
} else {
    echo json_encode(['success' => false, 'message' => 'Нет зарегистрированных пользователей.']);
    exit;
}

// Поиск пользователя и проверка пароля
$found = false;
foreach ($users as $user_info) {
    if ($user_info['username'] === $user && password_verify($pass, $user_info['password'])) {
        $found = true;
        break;
    }
}

if ($found) {
    echo json_encode(['success' => true, 'message' => 'Вы успешно вошли!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Неверное имя пользователя или пароль.']);
}
?>