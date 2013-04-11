<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Login</title>
		<link rel="stylesheet" type="text/css" href="js/style.css" />
	</head>
	<body>
		<div class="container">
			<header>
				<h1><strong>Smart Grid</strong>Login<h1>
				<h2>Welcome: blablabla<h2>
			</header>
			<section class="main">
				<form method="post" action="check_login.php" class="form-1">
					<p class="field">
						<input type="text" name="login" id="login" placeholder="Username or email">
						<i class="icon-user icon-large"></i>
					</p>
					<p class="field">
							<input type="password" name="password" id="password" placeholder="Password">
							<i class="icon-lock icon-large"></i>
					</p>
					<p class="submit">
						<button type="submit" name="submit" id="submit"><i class="icon-arrow-right icon-large">submit</i></button>
					</p>
				</form>
			</section>
		</div>
	</body>
</html>