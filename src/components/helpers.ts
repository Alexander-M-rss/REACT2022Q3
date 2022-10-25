const MIN_AGE = 12;

function validateBirthday(value: string) {
  const today = new Date().getFullYear();
  const birthday = new Date(value).getFullYear();

  return MIN_AGE <= today - birthday;
}

export default validateBirthday;
