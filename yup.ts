import * as yup from "yup";
import yup_ru_locale from "@/core/yup_ru_locale";

yup.setLocale(yup_ru_locale);

declare module 'yup' {
  interface NumberSchema {
    minAbs(minValue: number, message?: string): this;
    maxAbs(maxValue: number, message?: string): this;
  }
}

yup.addMethod(yup.number, 'minAbs', function (minValue, message) {
  return this.test({
    name: 'minAbs',
    message: message || `Значение по модулю должно быть ≥ ${minValue}`,
    test: value => value !== undefined && Math.abs(value) >= minValue,
  });
});

yup.addMethod(yup.number, 'maxAbs', function (maxValue, message) {
  return this.test({
    name: 'maxAbs',
    message: message || `Значение по модулю должно быть ≥ ${maxValue}`,
    test: value => value !== undefined && Math.abs(value) >= maxValue,
  });
});

export default yup;