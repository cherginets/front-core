import moment from "moment";

export function randomInteger(min: number = 0, max: number = 1000000) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
export function randomString(length: number = 8) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

export function randomBool() {
  return !!randomInteger(0, 1);
}

export function randomDate() {
  return moment();
}

export function randomElementFromArray<T = any>(array: T[]): T {
  if (!array.length) throw "array is empty";
  const index = randomInteger(0, array.length - 1);
  return array[index];
}

export function randomPhoneNumber():string {
  const operatorCodes = [
    // Базовые коды операторов (начинаются с 9)
    901, 902, 903, 904, 905, 906, 908, 909,
    910, 911, 912, 913, 914, 915, 916, 917,
    918, 919, 920, 921, 922, 923, 924, 925,
    926, 927, 928, 929, 930, 931, 932, 933,
    934, 936, 937, 938, 939, 950, 951, 952,
    953, 954, 955, 956, 957, 958, 959, 960,
    961, 962, 963, 964, 965, 966, 967, 968,
    969, 977, 978, 980, 981, 982, 983, 984,
    985, 986, 987, 988, 989, 999
  ];

  const operator = operatorCodes[Math.floor(Math.random() * operatorCodes.length)];
  const subscriber = Math.floor(1000000 + Math.random() * 9000000); // 7 цифр

  return `+7${operator}${subscriber}`;
}

export function randomLegalEntityName(): string {
  return randomElementFromArray(['ООО', "ОАО", "ЗАО", "АО"]) + " " + randomString(10);
}

export function randomFIO(gender: 'male' | 'female' = 'male'): string {
  const lastNames = {
    male: ['Иванов', 'Петров', 'Сидоров', 'Кузнецов', 'Смирнов', 'Попов', 'Соколов', 'Морозов', 'Егоров', 'Васильев'],
    female: ['Иванова', 'Петрова', 'Сидорова', 'Кузнецова', 'Смирнова', 'Попова', 'Соколова', 'Морозова', 'Егорова', 'Васильева']
  };

  const firstNames = {
    male: ['Александр', 'Дмитрий', 'Максим', 'Сергей', 'Андрей', 'Алексей', 'Иван', 'Михаил', 'Никита', 'Егор'],
    female: ['Анна', 'Екатерина', 'Мария', 'Ольга', 'Наталья', 'Ирина', 'Татьяна', 'Елена', 'Светлана', 'Алиса']
  };

  const patronymics = {
    male: ['Александрович', 'Дмитриевич', 'Сергеевич', 'Иванович', 'Михайлович', 'Андреевич', 'Алексеевич', 'Никитович'],
    female: ['Александровна', 'Дмитриевна', 'Сергеевна', 'Ивановна', 'Михайловна', 'Андреевна', 'Алексеевна', 'Никитовна']
  };

  const rand = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  const lastName = rand(lastNames[gender]);
  const firstName = rand(firstNames[gender]);
  const patronymic = rand(patronymics[gender]);

  return `${lastName} ${firstName} ${patronymic}`;
}



export function randomINN(type: "person" | "company" = "person"): string {
  function getControlDigit(inn: number[], coefficients: number[]): number {
    const sum = coefficients.reduce((acc, coef, i) => acc + coef * inn[i], 0);
    return (sum % 11) % 10;
  }

  const digits: number[] = [];

  if (type === "company") {
    // Первые 9 случайных цифр
    for (let i = 0; i < 9; i++) {
      digits.push(Math.floor(Math.random() * 10));
    }
    // Контрольная цифра
    const control = getControlDigit(digits, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
    digits.push(control);
  } else {
    // Первые 10 случайных цифр
    for (let i = 0; i < 10; i++) {
      digits.push(Math.floor(Math.random() * 10));
    }
    // 11-я контрольная
    const control1 = getControlDigit(digits, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
    digits.push(control1);
    // 12-я контрольная
    const control2 = getControlDigit(digits, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
    digits.push(control2);
  }

  return digits.join('');
}