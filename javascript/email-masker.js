let email = "freecodecamp@example.com";
function maskEmail(email) {
  const [local, domain] = email.split("@");
  const maskedLocal = local[0] + "*".repeat(local.length - 2) + local[local.length - 1];
  return maskedLocal + "@" + domain;
}
console.log(maskEmail(email));
