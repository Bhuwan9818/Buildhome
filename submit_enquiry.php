<?php
/**
 * Dhanyashree Homes — Enquiry Form Handler
 * Saves to MySQL database and sends email notification.
 *
 * SETUP: Edit the DB_* and MAIL_* constants below before deploying.
 */

/* ─── CONFIGURATION ─────────────────────────────────────────────── */
define('DB_HOST',     'localhost');
define('DB_NAME',     'dhanyashree_db');
define('DB_USER',     'root');           // ← change
define('DB_PASS',     'root');       // ← change
define('DB_CHARSET',  'utf8mb4');

define('MAIL_TO',     'bhuwansingh886043@gmail.com');  // ← destination inbox
define('MAIL_FROM',   'bhuwansingh8860@gmail.com');
define('MAIL_NAME',   'Dhanyashree Homes Website');

// Email transport method: 'mail' or 'smtp'
define('MAILER_METHOD', 'smtp');

// SMTP settings (used only if MAILER_METHOD = 'smtp')
define('SMTP_HOST',     'smtp.gmail.com');
define('SMTP_PORT',     587);
define('SMTP_SECURE',   'tls');
define('SMTP_USERNAME', 'bhuwansingh8860@gmail.com');  // your Gmail
define('SMTP_PASSWORD', 'metu ghcw azds jvip');    // get from Gmail app passwords
/* ─────────────────────────────────────────────────────────────────── */

require_once __DIR__ . '/Exception.php';
require_once __DIR__ . '/PHPMailer.php';
require_once __DIR__ . '/SMTP.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit();
}

/* ─── READ & SANITIZE INPUT ─────────────────────────────────────── */
function clean(string $val): string {
    return htmlspecialchars(strip_tags(trim($val)), ENT_QUOTES, 'UTF-8');
}

$name    = clean($_POST['name']    ?? '');
$phone   = clean($_POST['phone']   ?? '');
$email   = clean($_POST['email']   ?? '');
$budget  = clean($_POST['budget']  ?? '');
$project = clean($_POST['project'] ?? '');   // project name pre-filled from page
$message = clean($_POST['message'] ?? '');

/* ─── VALIDATION ────────────────────────────────────────────────── */
$errors = [];
if ($name   === '')                        $errors[] = 'Name is required.';
if (!preg_match('/^[0-9+\-\s]{7,15}$/', $phone)) $errors[] = 'A valid phone number is required.';
if ($email  !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Invalid email address.';
if ($project === '')                       $errors[] = 'Project name is missing.';

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => implode(' ', $errors)]);
    exit();
}

/* ─── SAVE TO DATABASE ──────────────────────────────────────────── */
try {
    $dsn = sprintf('mysql:host=%s;dbname=%s;charset=%s', DB_HOST, DB_NAME, DB_CHARSET);
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ]);

    $stmt = $pdo->prepare(
        'INSERT INTO enquiries (name, phone, email, budget, project, message, ip_address, submitted_at)
         VALUES (:name, :phone, :email, :budget, :project, :message, :ip, NOW())'
    );
    $stmt->execute([
        ':name'    => $name,
        ':phone'   => $phone,
        ':email'   => $email,
        ':budget'  => $budget,
        ':project' => $project,
        ':message' => $message,
        ':ip'      => $_SERVER['REMOTE_ADDR'] ?? 'unknown',
    ]);
    $enquiryId = $pdo->lastInsertId();

} catch (PDOException $e) {
    error_log('DB Error [enquiry]: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error. Please try again later.']);
    exit();
}

/* ─── SEND EMAIL ────────────────────────────────────────────────── */
$subject = "New Enquiry #{$enquiryId} — {$project}";

$bodyHtml = <<<HTML
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><style>
  body{font-family:Arial,sans-serif;background:#f5f5f5;margin:0;padding:0}
  .wrap{max-width:600px;margin:30px auto;background:#1c0d06;color:#e8ddd3;border-radius:6px;overflow:hidden}
  .header{background:#c98b4a;padding:28px 32px;color:#1c0d06}
  .header h1{margin:0;font-size:20px;letter-spacing:2px;text-transform:uppercase}
  .header p{margin:4px 0 0;font-size:12px;opacity:.8}
  .body{padding:32px}
  .field{margin-bottom:18px}
  .label{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#c98b4a;display:block;margin-bottom:4px}
  .value{font-size:15px;color:#e8ddd3}
  .footer{background:#111;padding:16px 32px;font-size:11px;color:#888;text-align:center}
  .badge{display:inline-block;background:rgba(201,139,74,.15);border:1px solid #c98b4a;color:#c98b4a;padding:4px 14px;border-radius:3px;font-size:11px;letter-spacing:1px;margin-bottom:20px}
</style></head>
<body>
<div class="wrap">
  <div class="header">
    <h1>Dhanyashree Homes</h1>
    <p>New project enquiry received</p>
  </div>
  <div class="body">
    <div class="badge">Enquiry #{$enquiryId}</div>
    <div class="field"><span class="label">Project</span><span class="value">{$project}</span></div>
    <div class="field"><span class="label">Full Name</span><span class="value">{$name}</span></div>
    <div class="field"><span class="label">Phone</span><span class="value">{$phone}</span></div>
    <div class="field"><span class="label">Email</span><span class="value">{$email}</span></div>
    <div class="field"><span class="label">Budget</span><span class="value">{$budget}</span></div>
    <div class="field"><span class="label">Message</span><span class="value">{$message}</span></div>
  </div>
  <div class="footer">This is an automated notification from dhanyashreehomes.in</div>
</div>
</body>
</html>
HTML;

$bodyText = "New Enquiry #{$enquiryId} — {$project}\n\n"
          . "Name:    {$name}\nPhone:   {$phone}\nEmail:   {$email}\n"
          . "Budget:  {$budget}\nProject: {$project}\nMessage: {$message}";

try {
    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';

    if (MAILER_METHOD === 'smtp') {
        $mail->isSMTP();
        $mail->SMTPAuth   = true;
        $mail->Host       = SMTP_HOST;
        $mail->Port       = SMTP_PORT;
        $mail->SMTPSecure = SMTP_SECURE;
        $mail->Username   = SMTP_USERNAME;
        $mail->Password   = SMTP_PASSWORD;
        $mail->SMTPAutoTLS = SMTP_SECURE === 'tls';
    } else {
        $mail->isMail();
    }

    $mail->setFrom(MAIL_FROM, MAIL_NAME);
    $mail->addAddress(MAIL_TO);
    if ($email !== '') {
        $mail->addReplyTo($email, $name ?: 'Website visitor');
    }
    $mail->Subject = $subject;
    $mail->isHTML(true);
    $mail->Body    = $bodyHtml;
    $mail->AltBody = $bodyText;
    $mail->Sender  = MAIL_FROM;

    if (!$mail->send()) {
        error_log("PHPMailer send failed for enquiry #{$enquiryId}: " . $mail->ErrorInfo);
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Email could not be sent. Please check mail configuration.']);
        exit();
    }
} catch (Exception $e) {
    error_log("PHPMailer exception for enquiry #{$enquiryId}: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Email could not be sent. Please check mail configuration.']);
    exit();
}

/* ─── SUCCESS RESPONSE ──────────────────────────────────────────── */
echo json_encode([
    'success' => true,
    'message' => "Thank you, {$name}! We've received your enquiry and will contact you shortly.",
    'id'      => (int)$enquiryId,
]);
