// Глобальная переменная для хранения данных формы
let formData = {};

// Основная функция
function showResults() {
  // Получаем значения из полей ввода
  //⇓-переменная, которую нельзя изменить позже
  const fields = [
    {
      value: document.getElementById("lastName").value.trim(),
      //входная ⇑ точка. получение значения → string-⇑. ⇑-string.trim() → string, убирает пробелы (очищает)
      name: "фамилию",
      id: "lastName",
    },
    {
      value: document.getElementById("firstName").value.trim(),
      name: "имя",
      id: "firstName",
    },
    {
      value: document.getElementById("middleName").value.trim(),
      name: "отчество",
      id: "middleName",
    },
  ];
  const age = document.getElementById("age").value;

  // Проверка пустых полей
  for (const field of fields) {
    if (!field.value) {
      alert(`Пожалуйста, введите ${field.name}!`);
      document.getElementById(field.id).focus(); // .focus - Ставим курсор в поле c ошибкой
      return;
    }
  }

  // Проверка корректности ФИО
  const nameRegex = /^[А-Яа-яЁё\s-]+$/; // Регулярное выражение
  for (const field of fields) {
    if (!nameRegex.test(field.value)) {
      alert(
        `${field.name} может содержать только русские буквы, пробелы и дефисы!`
      );
      document.getElementById(field.id).focus();
      return;
    }
  }

  // Проверка возраста
  const ageNum = parseInt(age);
  if (!age || isNaN(ageNum) || ageNum <= 12) {
    alert("Ограничение по возрасту! (12+)");
    document.getElementById("age").focus();
    return;
  }

  // Переменные для вывода
  const [lastName, firstName, middleName] = fields.map((f) => f.value);

  // Сохраняем данные для дальнейшей обработки
  formData = {
    lastName,
    firstName,
    middleName,
    age: ageNum, // Сохраняем как число
  };

  // Показываем модальное окно
  document.getElementById("genderModal").style.display = "block";
}

// Функция для обработки после выбора пола
function processWithGender(isMale) {
  const { lastName, firstName, middleName, age } = formData;

  // Вычисляем дополнительные данные
  // const ageNum = parseInt(age); // Преобразуем возраст в число
  const ageInDays = (age * 365).toLocaleString(); // Возраст в днях, toLocaleString() - добавляем разделители тысяч
  const ageIn5Years = age + 5; // Возраст через 5 лет

  // Определяем пенсионный статус (М:60 лет, Ж:55 лет)
  const pensionAge = isMale ? 60 : 55; // Тернарный оператор для выбора возраста
  const isPensioner = age >= pensionAge; // true/false в зависимости от возраста

  // Формируем итоговую анкету с использованием шаблонных строк
  const result = `
ВАША АНКЕТА:
────────────────────────
ФИО: ${lastName} ${firstName} ${middleName}
Возраст в годах: ${age} лет
Возраст в днях: ${ageInDays} дней
Через 5 лет вам будет: ${ageIn5Years} лет
Пол: ${isMale ? "мужской" : "женский"}
Вы на пенсии: ${isPensioner ? "да" : "нет"}
────────────────────────
    `;

  // Выводим результат одним alert (как требуется в задании)
  alert(result);
}

// Функция для кнопок модального окна
function selectGender(isMale) {
  document.getElementById("genderModal").style.display = "none";
  processWithGender(isMale);
}

// Функция для закрытия модального окна результатов
function closeResultModal() {
  document.getElementById("resultModal").style.display = "none";
}
