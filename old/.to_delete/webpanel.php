<?php
/**
 * Simple KAS API client web interface
 * -------------------------------------------------------
 * SECURITY NOTE:
 *   - Do NOT use plain-text passwords in production.
 *   - Always protect this page with HTTP Auth or restrict by IP.
 *   - Consider moving the SOAP call into a backend controller.
 *
 * Requirements:
 *   * PHP ≥ 7.4 with SOAP extension enabled
 */

function callKasApi(string $login, string $password, string $action, array $params = [], string $authType = 'plain')
{
    // Build request payload
    $request = [
        'kas_login'        => $login,
        'kas_auth_type'    => $authType,
        'kas_auth_data'    => $password,
        'kas_action'       => $action,
        'KasRequestParams' => $params,
    ];

    // Create SOAP client (WSDL is publicly available)
    $client = new SoapClient('https://kasapi.kasserver.com/soap/wsdl/KasApi.wsdl', [
        'cache_wsdl' => WSDL_CACHE_BOTH,
        'trace'      => false,
        'exceptions' => true,
    ]);

    // The KasApi() SOAP method expects a JSON-encoded argument
    $response = $client->KasApi(json_encode($request));

    // Response itself is JSON-encoded
    return json_decode($response, true, 512, JSON_THROW_ON_ERROR);
}

/* ---------- Form handling ---------- */
$result = null;
$error  = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $login    = trim($_POST['kas_login']      ?? '');
    $password = trim($_POST['kas_password']   ?? '');
    $action   = trim($_POST['kas_action']     ?? '');
    $paramRaw = trim($_POST['kas_parameters'] ?? '');

    // Very naive validation
    if (!$login || !$password || !$action) {
        $error = 'Bitte alle Pflichtfelder ausfüllen.';
    } else {
        // Parse optional parameters (JSON)
        $params = [];
        if ($paramRaw !== '') {
            try {
                $params = json_decode($paramRaw, true, 512, JSON_THROW_ON_ERROR);
                if (!is_array($params)) {
                    throw new RuntimeException();
                }
            } catch (Throwable $t) {
                $error = 'Parameter-JSON ist fehlerhaft: ' . $t->getMessage();
            }
        }

        if ($error === null) {
            try {
                $result = callKasApi($login, $password, $action, $params);
            } catch (Throwable $t) {
                $error = 'API-Fehler: ' . $t->getMessage();
            }
        }
    }
}
?>
<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<title>KAS API – Einfaches Interface</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body{font-family:system-ui,Arial,sans-serif;margin:2rem;background:#f9fafb;color:#111}
form{background:#fff;padding:1.5rem;border-radius:.75rem;box-shadow:0 1px 4px rgba(0,0,0,.1);max-width:600px;margin:auto}
label{display:block;font-weight:600;margin-top:1rem}
input,textarea,select{width:100%;padding:.5rem;border:1px solid #ccc;border-radius:.375rem;margin-top:.25rem;font:inherit}
button{margin-top:1.5rem;padding:.625rem 1.25rem;font:inherit;border:0;border-radius:.5rem;cursor:pointer;box-shadow:0 1px 2px rgba(0,0,0,.1)}
button:hover{background:#0063e5;color:#fff}
pre{background:#1e1e1e;color:#eaeaea;padding:1rem;border-radius:.5rem;overflow:auto}
.alert{background:#fee2e2;color:#b91c1c;padding:.75rem 1rem;border-radius:.375rem;margin:.5rem auto;max-width:600px}
</style>
</head>
<body>
<h1 style="text-align:center">KAS API Interface (Demo)</h1>

<?php if ($error): ?>
<div class="alert">⚠️ <?= htmlspecialchars($error) ?></div>
<?php endif; ?>

<form method="post" action="">
    <label for="kas_login">KAS-Login *</label>
    <input type="text" id="kas_login" name="kas_login" value="<?= htmlspecialchars($_POST['kas_login'] ?? '') ?>" required>

    <label for="kas_password">KAS-Passwort *</label>
    <input type="password" id="kas_password" name="kas_password" required>

    <label for="kas_action">API-Aktion *</label>
    <select id="kas_action" name="kas_action" required>
        <?php
        // Minimal Liste gängiger Read-only Aktionen
        $actions = ['get_domains', 'get_subdomains', 'get_mailaccounts', 'get_databases'];
        $selected = $_POST['kas_action'] ?? '';
        foreach ($actions as $a) {
            $sel = $selected === $a ? 'selected' : '';
            echo "<option value=\"{$a}\" {$sel}>{$a}</option>";
        }
        ?>
    </select>

    <label for="kas_parameters">Optionale Parameter (JSON-Format)</label>
    <textarea id="kas_parameters" name="kas_parameters" rows="4" placeholder='z.B.: { "domain": "example.com" }'><?= htmlspecialchars($_POST['kas_parameters'] ?? '') ?></textarea>

    <button type="submit">Anfrage senden</button>
</form>

<?php if ($result !== null): ?>
<h2 style="text-align:center;margin-top:2rem">Ergebnis</h2>
<pre><?= htmlspecialchars(json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)) ?></pre>
<?php endif; ?>
</body>
</html>