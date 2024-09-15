-- -------------------------------------------------------------
-- TablePlus 6.1.6(570)
--
-- https://tableplus.com/
--
-- Database: deteksi_hipertensi
-- Generation Time: 2024-09-15 12:46:26.6890
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE TABLE `aturans` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `penyakit_id` bigint unsigned NOT NULL,
  `gejala_id` bigint unsigned NOT NULL,
  `nilai` double NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `nilai_dst` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '[]',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `gejalas` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `kode` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `kategori` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deskripsi` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `penyakits` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `kode` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deskripsi` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `solusi` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `rekam_gejalas` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `rekamMedis_id` bigint unsigned NOT NULL,
  `gejala_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `rekam_medis` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `gejala` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `penyakit` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `aksi` mediumtext COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `rekam_penyakits` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `rekamMedis_id` bigint unsigned NOT NULL,
  `penyakit_id` bigint unsigned NOT NULL,
  `nilai` double NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `no_hp` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `jenis_kelamin` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tempat_lahir` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tanggal_lahir` date NOT NULL,
  `alamat` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `aturans` (`id`, `penyakit_id`, `gejala_id`, `nilai`, `created_at`, `updated_at`, `nilai_dst`) VALUES
(1, 1, 1, 0.3, '2024-08-25 08:34:45', '2024-08-25 08:34:45', '[1.0,0.0,0.4]'),
(2, 1, 3, -1, '2024-08-25 08:38:50', '2024-08-25 08:38:50', '[0.5,0.2,0.3]'),
(4, 3, 3, 0, '2024-08-28 04:09:38', '2024-08-28 04:09:38', '[]'),
(5, 4, 1, 0, '2024-08-28 04:11:54', '2024-08-28 04:11:54', '[]'),
(6, 3, 1, 0, '2024-08-28 04:13:28', '2024-08-28 04:13:28', '[]'),
(7, 3, 1, 0, '2024-08-28 04:14:53', '2024-08-28 04:14:53', '[]'),
(8, 3, 1, 1, '2024-08-28 04:20:13', '2024-08-28 04:20:13', '[]'),
(9, 1, 3, 1, '2024-08-28 04:21:38', '2024-08-28 04:21:38', '[]'),
(10, 3, 3, 1, '2024-08-28 04:22:23', '2024-08-28 04:22:23', '[]'),
(11, 3, 3, 1, '2024-08-28 04:22:25', '2024-08-28 04:22:25', '[]'),
(12, 3, 3, 1, '2024-08-28 04:22:25', '2024-08-28 04:22:25', '[]'),
(13, 3, 3, 1, '2024-08-28 04:22:25', '2024-08-28 04:22:25', '[]'),
(14, 3, 3, 1, '2024-08-28 04:22:26', '2024-08-28 04:22:26', '[]'),
(15, 3, 3, 1, '2024-08-28 04:22:26', '2024-08-28 04:22:26', '[]'),
(16, 1, 3, 1, '2024-08-28 04:23:06', '2024-08-28 05:02:31', '[0.2,0.3,0.1]');

INSERT INTO `gejalas` (`id`, `kode`, `name`, `kategori`, `deskripsi`, `created_at`, `updated_at`) VALUES
(1, 'H92', 'batuk', 'semua', 'ad', '2024-08-25 03:45:35', '2024-08-25 03:45:35'),
(3, 'h04', 'Pusing', 'semua', 'kepala sakit', '2024-08-26 03:25:53', '2024-08-26 03:25:53'),
(4, 'h08', 'pilek', 'semua', 'adsadad', '2024-08-26 03:26:16', '2024-08-26 03:26:16');

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2024_08_23_015501_create_penyakits_table', 1),
(5, '2024_08_23_015516_create_gejalas_table', 1),
(6, '2024_08_23_015802_create_personal_access_tokens_table', 1),
(7, '2024_08_23_022435_create_aturans_table', 1),
(8, '2024_08_23_023822_create_rekam_medis_table', 1),
(10, '2024_08_28_021602_add_nilai_dst_to_aturans_table', 2);

INSERT INTO `penyakits` (`id`, `kode`, `name`, `deskripsi`, `solusi`, `created_at`, `updated_at`) VALUES
(1, 'H92', 'Hipertensi rendah', 'adasd', '[\"asdasd\",\"asdd\",\"oi\"]', '2024-08-25 03:17:58', '2024-08-25 03:17:58'),
(3, 'H92', 'João Souza Silva', 'asd', '[]', '2024-08-25 03:20:27', '2024-08-25 03:20:27'),
(4, 'H92', 'asdasdasdas', 'asd', '[]', '2024-08-25 03:23:19', '2024-08-25 03:23:19'),
(5, 'H92sadada', 'asdasd', 'asd', '[]', '2024-08-25 03:23:27', '2024-08-25 03:23:27'),
(6, 'adasd', 'asdasd', 'asdada', '[]', '2024-08-25 03:23:37', '2024-08-25 03:23:37'),
(7, 'asdasd', 'asdasd', 'asdasd', '[]', '2024-08-25 03:23:45', '2024-08-25 03:23:45');

INSERT INTO `rekam_medis` (`id`, `user_id`, `created_at`, `updated_at`, `gejala`, `penyakit`, `aksi`) VALUES
(1, 1, '2024-08-22 13:14:57', '2024-08-23 13:14:57', NULL, NULL, NULL),
(2, 5, '2024-09-13 07:54:24', '2024-09-13 07:54:24', 'H92 batuk', 'Hipertensi rendah', 'info ke dokter'),
(3, 5, '2024-09-13 07:54:30', '2024-09-13 07:54:30', 'H92 batuk', 'Hipertensi rendah', 'info ke dokter'),
(4, 5, '2024-09-13 07:54:49', '2024-09-13 07:54:49', 'H92 batuk', 'Hipertensi rendah', 'info ke dokter'),
(5, 5, '2024-09-13 08:25:30', '2024-09-13 08:25:30', 'h08 pilek', 'Hipertensi rendah', 'info ke dokter'),
(6, 5, '2024-09-13 08:25:38', '2024-09-13 08:25:38', 'h04 Pusing, h08 pilek', 'Hipertensi rendah', 'info ke dokter'),
(7, 5, '2024-09-13 13:10:46', '2024-09-13 13:10:46', 'h04 Pusing, h08 pilek', 'Hipertensi rendah', 'info ke dokter');

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `no_hp`, `jenis_kelamin`, `tempat_lahir`, `tanggal_lahir`, `alamat`, `password`, `role`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Wahyu Dwi Prakoso', 'wahyu@wahyu.wahyu', NULL, '87651231231', 'L', 'Bali', '2024-08-08', 'aslkdjaskjdasd', '$2y$12$ZkxEw4T.rwgujvcprc7y0e2CATPy7ufp6xOLlrDKddTIXq6usg0a.', '1945', NULL, '2024-08-25 03:15:05', '2024-08-25 03:15:05'),
(2, 'João Souza Silva', 'teste@exemplo.us', NULL, '123412341234', 'P', 'waw', '2024-08-22', 'asdasd', '$2y$12$7I2kvEISZ9OWBQusmf2l7upNUaMk7oVGGowcL7l1.6T6CiNQWq9Fa', '2012', NULL, '2024-08-25 09:34:00', '2024-08-25 09:34:00'),
(3, 'Jon Stewart Doed', 'murid@murid.murid', NULL, '1231231312312', 'P', 'murid', '2024-08-14', 'murid', '$2y$12$EHmZxRvAycGEQCnV9AbHR.gphXGPzM3faP4v1UX93TaqSifsc8Z8.', '2012', NULL, '2024-08-25 09:34:39', '2024-08-25 09:34:39'),
(4, 'Wahyu Dwi Prakoso', 'murid2@murid.murid', NULL, '1312313123', 'P', 'okokkkook', '2024-08-21', 'adasd', '$2y$12$P/V6jdQM42Mhlwh4u1Eg1Ow/rDQBPc7vjYXw6LFpD07BxNNBVAQj6', '2012', NULL, '2024-08-26 01:56:51', '2024-08-26 01:56:51'),
(5, 'Thomi Aditya', 'thomiaditya@gmail.com', NULL, '3423432435', 'L', 'Jember', '2024-09-03', 'sxksmxkmcjdncjnd jndjcn djncjdnc', '$2y$12$ACQ8t3v.JF0Ac3UDUDoOSuQqe.29c2xUJylywKl9lg74g2sAL3Gf2', '1945', NULL, '2024-08-27 15:10:57', '2024-08-27 15:10:57'),
(6, 'Hilal', 'hilal@gmail.com', NULL, '9239874', 'P', 'Tanggul', '2024-09-20', 'sds dsfdndjkskjxxnjkn', '$2y$12$/vuVxL4jMAb8Ep02ANglpeq0xgwn.qnjTjZytdppbcwpNyY1LMTTq', '2012', NULL, '2024-09-13 13:16:44', '2024-09-13 13:16:44');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;