import * as yup from "yup";
import {ru} from "yup-locales";

yup.setLocale(ru);

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

export {yup};
