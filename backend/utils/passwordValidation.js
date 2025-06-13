const passwordValidation = (password) => {
  const errors = [];

  if (password.length < 8) {
    errors.push("• Şifre en az 8 karakter uzunluğunda olmalıdır.");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("• En az bir küçük harf (a-z) içermelidir.");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("• En az bir büyük harf (A-Z) içermelidir.");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("• En az bir rakam (0-9) içermelidir.");
  }
  if (!/[!@#$%^&*(),.?":{}|<>-]/.test(password)) {
    errors.push("• En az bir özel karakter (!@#$%^&*) içermelidir.");
  }

  if (errors.length > 0) {
    throw new Error(errors);
  }
};

module.exports = passwordValidation;
