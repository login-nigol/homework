function startAnketa() {
  let lastName, firstName, middleName, age, isMale;

  let isValid = false; // явная инициализация

  do {
    lastName = prompt("Введите фамилию:") ?? ""; // Guard clauses- ранние возвраты при ошибках

    const hasValue = lastName.trim();
    const correctFormat = lastName.match(/^[а-яёa-z\s\-]+$/i);
    isValid = hasValue && correctFormat; // флаг валидности

    if (!isValid) {
      alert(
        !hasValue
          ? "Поле обязательно для заполнения!"
          : "Только буквы, пробелы и дефисы!"
      );
    }
  } while (!isValid); // одна проверка
  //    trim(); - убирает лишние пробелы и проверит есть ли сожержание в строке
  //    ?? ""; - оператор Nullish Coalescing обработка null/undefined
  //    "??"- работает только с null/undefined, игнорируя другие "ложные" значения: "", 0, false
  //    prompt вернет null при нажатии на "Отмена" либо любое другое значение
  //    match() проверяет соответствие строки шаблону, возвращает null при ошибке
  //    флаг /i в регулярке делает проверку регистронезависимой
  //    DRY принцип

  isValid = false;
  do {
    firstName = prompt("Введите имя:") ?? "";

    const hasValue = firstName.trim();
    const correctFormat = firstName.match(/^[а-яёa-z\s\-]+$/i);
    isValid = hasValue && correctFormat;

    if (!isValid) {
      alert(
        !hasValue ? "Обязательное поле!" : "Только буквы, пробелы и дефисы!"
      );
    }
  } while (!isValid);

  isValid = false;
  do {
    middleName = prompt("Введите отчество:") ?? "";

    const hasValue = middleName.trim();
    const correctFormat = middleName.match(/^[а-яёa-z\s\-]+$/i);
    isValid = hasValue && correctFormat;

    if (!isValid) {
      alert(
        !hasValue ? "Обязательное поле!" : "Только буквы, пробелы и дефисы!"
      );
    }
  } while (!isValid);

  do {
    let ageInput = prompt("Введите возраст:\nОграничение по возрасту 6+") ?? "";

    if (!ageInput.trim()) {
      alert("Обязательное поле!");
      continue;
    }
    if (isNaN(ageInput)) {
      alert("Должно быть числом!");
      continue;
    }
    age = Number(ageInput);
    if (age <= 6) {
      alert("ОТ 7ти лет!");
      continue;
    } else if (age > 99) {
      alert("До 99ти лет!");
      continue;
    } else {
      break;
    }
  } while (true);

  isMale = confirm("Ваш пол - мужской?\n\nOK - мужской,\nОтмена - женский");
  
  const ageInDays = age * 365; // учитываем высокосные годы
  const ageAfter5Years = age + 5;
  const gender = isMale ? "мужской" : "женский";
  const pensionAge = isMale ? 63 : 58;
  const isPensioner = age >= pensionAge ? "да" : "нет";
  
  let finalAnketa = 
  "ФИО: " + lastName + " " + firstName + " " + middleName + "\n" +
  "Возраст в годах: " + age + " лет" + "\n" +
  "Возраст в днях: " + ageInDays + " дней" + "\n" +
  "Через 5 лет вам будет: " + ageAfter5Years + " лет" + "\n" +
  "Пол: " + gender + "\n" +
  "На пенсии: " + isPensioner;
  
  alert(finalAnketa);
}