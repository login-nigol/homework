// глобальные переменные для отслеживания состояния анкеты
let currentStep = 0; // текущий шаг ввода (0-фамилия, 1-имя, 2-отчество, 3-возраст)
let userData = {}; // объект для хранения всех данных пользователя

function startAnketa() {
  // основная функция запуска анкеты
  currentStep = 0; // сбрасываем счётчик шагов
  userData = {}; // очищаем предыдущие данные
  showNextInput(); // запускаем процесс ввода данных
}

function showNextInput() {
  // функция показа следующего поля ввода
  const steps = [
    // массив шагов с заголовками и названиями полей
    { title: "Увядзіце прозвішча", field: "lastName" },
    { title: "Увядзіце імя", field: "firstName" },
    { title: "Увядзіце імя па бацьку", field: "middleName" },
    { title: "Увядзіце узрост", field: "age" },
  ];

  // если ещё не все шаги пройдены
  if (currentStep < steps.length) {
    // настраиваем модалку для текущего шага
    document.getElementById("inputTitle").textContent =
      steps[currentStep].title; // меняем заголовок
    document.getElementById("userInput").value = ""; // ччищаем поле ввода
    document.getElementById("inputModal").style.display = "block"; // показываем модалку
    document.getElementById("userInput").focus(); // ставим курсор в поле
  } else {
    // все данные введены - переходим к выбору пола
    document.getElementById("inputModal").style.display = "none"; // скрываем модалку ввода
    document.getElementById("genderModal").style.display = "block"; // показываем модалку пола
  }
}

// функция обработки введённых данных
function processInput() {
  const input = document.getElementById("userInput").value.trim(); // получаем и очищаем ввод(.trim)

  // проверка на пустое поле
  if (!input) {
    alert("Поле не можа быць пустым");
    return; // прерываем выполнение если поле пустое
  }

  // проверка ФИО (только шаги 0,1,2 - фамилия, имя, отчество)
  if (currentStep < 3) {
    // проверяем что только буквы, дефисы и пробелы
    if (!/^[а-яА-ЯёЁa-zA-Z\s\-]+$/.test(input)) {
      alert("Прозвішча, імя, імя па бацьку могуць утрымліваць толькі літары, злучкі і прабелы");
      return;
    }

    // проверяем минимальную длину (3 символа)
    if (input.length < 3) {
      alert("Прозвішча, імя, імя па бацьку павінны ўтрымліваць мінімум 3 сімвалы");
      return;
    }

    // Сохраняем ФИО с правильным регистром
    const fields = ["lastName", "firstName", "middleName"];
    userData[fields[currentStep]] =
      input.charAt(0).toUpperCase() + input.slice(1).toLowerCase(); //  первая буква заглавная
  }

  if (currentStep === 3) {
    // проверка для поля возраста (шаг 3)
    if (isNaN(input) || input <= 6) {
      // проверяем что это число и возраст >= 6
      alert("Толькі лічбы!\n Абмежаванне па ўзросце 6+\n Доступ забаронены!");
      return; // прерываем если возраст некорректен
    }
    userData.age = Number(input); // сохраняем возраст как число
  }

  currentStep++; // переходим к следующему шагу
  showNextInput(); // показываем следующее поле
}

// функция выбора пола
function selectGender(isMale) {
  userData.isMale = isMale; // сохраняем выбор пола
  document.getElementById("genderModal").style.display = "none"; // скрываем модалку пола
  showResult(); // показываем финальный результат
}

function showResult() {
  // функция показа результата
  const age = userData.age;
  const ageInDays = age * 365;
  const ageAfter5Years = age + 5;
  const genderText = userData.isMale ? "Мужчынскі" : "Жаночы";
  const pensionAge = userData.isMale ? 63 : 58;
  // проверка пенсионного возраста
  const isPensioner = age >= pensionAge ? "Так, на пенсіі" : "Не, не на пенсіі";

  // функция для форматирования чисел с разделителями
  function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  // функция для склонения слова "год"
  function getAgeWord(age) {
    const lastDigit = age % 10;
    const lastTwoDigits = age % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return "лет";
    }
    if (lastDigit === 1) {
      return "год";
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
      return "года";
    }
    return "лет";
  }

  // функция для склонения слова "день"
  function getDaysWord(days) {
    const lastDigit = days % 10;
    const lastTwoDigits = days % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return "дней";
    }
    if (lastDigit === 1) {
      return "день";
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
      return "дня";
    }
    return "дней";
  }

  // формирование финальной анкеты
  const finalAnketa = `
      ПІБ: <strong>${userData.lastName} ${userData.firstName} ${userData.middleName}</strong><br>
      Узрост у гадах: <strong>${formatNumber(age)} ${getAgeWord(age)}</strong><br>
      Узрост у днях: <strong>${formatNumber(ageInDays)} ${getDaysWord(ageInDays)}</strong><br>
      Праз 5 гадоў вам будзе: <strong>${formatNumber(ageAfter5Years)} ${getAgeWord(ageAfter5Years)}</strong><br>
      Пол: <strong>${genderText}</strong><br>
      На пенсіі: <strong>${isPensioner}</strong>
    `;

  // вставляем результат в модалку
  document.getElementById("anketaResult").innerHTML = finalAnketa;

  // показываем модалку с результатом
  document.getElementById("resultModal").style.display = "block";
}

// функция закрытия результата
function closeResult() {
  document.getElementById("resultModal").style.display = "none";
}

// обнови функцию selectGender
function selectGender(isMale) {
  userData.isMale = isMale;
  document.getElementById("genderModal").style.display = "none";
  showResult(); // теперь показываем кастомную модалку
}

//-----------------------------------------------------------------

//                    ⇓-запрос фамилии
// userData.lastName = prompt("Введите вашу фамилию:");
// while (!userData.lastName) {
//   userData.lastName = prompt(
//     "Обязательное поле для заполнения. Введите вашу фамилию:"
//   );
// }
// userData.firstName = prompt("Введите ваше имя:");
// while (!userData.firstName) {
//   userData.firstName = prompt(
//     "Обязательное поле для заполнения. Введите ваше имя:"
//   );
// }
// userData.middleName = prompt("Введите ваше отчество:");
// while (!userData.middleName) {
//   userData.middleName = prompt(
//     "Обязательное поле для заполнения. Введите ваше отчество:"
//   );
// }
//----------------------------------------------------------
//                ⇓-запрос возраста
// let ageInput = prompt("Введите ваш возраст в годах");
// while (!ageInput || isNaN(ageInput) || ageInput <= 6) {
//   ageInput = prompt("Только цифры!\n Ограничение по возрасту 6+!\n Доступ закрыт!:");
// }
// преобразуем в число
// userData.age = Number(ageInput);
//----------------------------------------------------------
// кастомная модалка
//     document.getElementById("genderModal").style.display = "block";
// }
//   isMale: true - да -⇓- isMale: false - нет
// function selectGender(isMale) {
// isMale - параметр функции, получает true/false
// userData.isMale = isMale; // сохраняем выбор пола в объект userData
//                скрываем модалку выбора пола-⇓
//     document.getElementById("genderModal").style.display = "none";
//     showResult(); // вызов функции
// }
//----------------------------------------------------------

// let genderText;
// if (isMale) {
//   genderText = "мужской";
// } else {
//   genderText = "женский";
// }

// let pensionAge;
// if (isMale) {
//   pensionAge = 63;
// } else {
//   pensionAge = 58;
// }

// let isPensioner;
// if (age >= pensionAge) {
//   isPensioner = "да, на пенсии";
// } else {
//   isPensioner = "нет, не на пенсии";
// }

// alert(finalAnketa); // результат
