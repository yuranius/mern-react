-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Июл 14 2022 г., 21:02
-- Версия сервера: 10.4.24-MariaDB
-- Версия PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `phone_book`
--

-- --------------------------------------------------------

--
-- Структура таблицы `friends`
--

CREATE TABLE `friends` (
  `id` int(11) NOT NULL,
  `friends_one` int(11) NOT NULL,
  `friends_two` int(11) NOT NULL,
  `status` enum('0','1','2') COLLATE utf8_croatian_ci NOT NULL,
  `created` int(13) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_croatian_ci;

--
-- Дамп данных таблицы `friends`
--

INSERT INTO `friends` (`id`, `friends_one`, `friends_two`, `status`, `created`) VALUES
(1, 28, 29, '1', NULL),
(2, 28, 64, '1', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `user_to_id` int(11) NOT NULL,
  `user_from_id` int(11) NOT NULL,
  `content` varchar(300) COLLATE utf8_croatian_ci NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_croatian_ci;

--
-- Дамп данных таблицы `messages`
--

INSERT INTO `messages` (`id`, `user_to_id`, `user_from_id`, `content`, `created_at`) VALUES
(1, 28, 29, 'Привет! Как дела?', '2022-07-10 19:37:28');

-- --------------------------------------------------------

--
-- Структура таблицы `updates`
--

CREATE TABLE `updates` (
  `update_status_id` int(11) NOT NULL,
  `update_status` varchar(45) COLLATE utf8_croatian_ci NOT NULL,
  `user_id_fk` int(45) NOT NULL,
  `created` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_croatian_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) COLLATE utf8_croatian_ci NOT NULL,
  `password` char(60) COLLATE utf8_croatian_ci NOT NULL,
  `login` varchar(50) COLLATE utf8_croatian_ci NOT NULL,
  `registration` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_croatian_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `login`, `registration`) VALUES
(28, 'test@test.ru', '$2a$12$JG6R7.IMmhPm81i0FNDBWeU3ee8RWr9GTIt5L3svJ05Sx68fRX3tu', 'Муся', '0000-00-00 00:00:00'),
(29, 'test2@test.ru', '$2a$12$3OPZn/CACroIa8Nw6rCsM.3nFfzQownq1zQJc29Zw5CS957TQ5RZG', 'Буся', '0000-00-00 00:00:00'),
(64, '1234@123.ru', '$2a$12$9qSF0e8knCOV55lhA9dPiu1oijf2EWfCpTi572uCGoA8rAsp5W4sa', 'yuranius', '2022-07-09 08:38:54'),
(65, 'test3@test.ru', '$2a$12$fqpZAaHT.CsTMfBgYeFs4ODcRdFSa5cKHcQb9qT5CL5De5rtKV6Oq', '', '2022-07-13 20:07:34');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `friends`
--
ALTER TABLE `friends`
  ADD PRIMARY KEY (`id`),
  ADD KEY `friends_one` (`friends_one`,`friends_two`),
  ADD KEY `friends_two` (`friends_two`);

--
-- Индексы таблицы `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `user_to_id` (`user_to_id`) USING BTREE,
  ADD KEY `user_from_id` (`user_from_id`) USING BTREE;

--
-- Индексы таблицы `updates`
--
ALTER TABLE `updates`
  ADD PRIMARY KEY (`update_status_id`),
  ADD KEY `user_id_fk` (`user_id_fk`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `friends`
--
ALTER TABLE `friends`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `updates`
--
ALTER TABLE `updates`
  MODIFY `update_status_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `friends`
--
ALTER TABLE `friends`
  ADD CONSTRAINT `friends_ibfk_1` FOREIGN KEY (`friends_one`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `friends_ibfk_2` FOREIGN KEY (`friends_two`) REFERENCES `users` (`id`);

--
-- Ограничения внешнего ключа таблицы `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`user_to_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`user_from_id`) REFERENCES `users` (`id`);

--
-- Ограничения внешнего ключа таблицы `updates`
--
ALTER TABLE `updates`
  ADD CONSTRAINT `updates_ibfk_1` FOREIGN KEY (`user_id_fk`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
