export function getStringSizeInKB(str: string) {
  const encoder = new TextEncoder();
  const encoded = encoder.encode(str); // Кодирует строку в байты
  const sizeInBytes = encoded.length; // Получаем количество байтов
  const sizeInKB = sizeInBytes / 1024; // Переводим в килобайты
  return sizeInKB;
}
