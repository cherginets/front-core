/**
 * Не рекомендуется использовать в сыром виде, лучше написать адаптер FormikImageField для конкретного проекта
 * подготовив функции загрузки\удаления\получения изображений
 */
import {useFormikContext} from "formik";
import {DropEvent, FileRejection, useDropzone} from "react-dropzone";
import {n_error, n_promise} from "@/core/features/notifications";
import {FormControl, FormHelperText, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {NextLink} from "@/core/components/NextMuiLink";
import {Preloader} from "@/core/components/Preloader";
import {useCallback} from "react";

// FileType - тип записи файла в системе проекта
// ValueType - тип значения поля в форме
export type CoreFormikImageFieldProps<FileType, ValueType> = {
  label: string;
  name: string
  helperText: string

  // Функция загрузки файла
  uploadFiles: <T extends File>(
    acceptedFiles: T[],
    fileRejections: FileRejection[],
    event: DropEvent
  ) => Promise<FileType[]>
  // Функция удаления файла
  deleteFile: (value: ValueType) => Promise<any>
  // Сюда нельзя передавать хук напрямую, см. пример
  useFile: (value: any) => {
    file?: {
      filename: string
      link: string
    }
    isLoading: boolean
  }
  // Функция получения значения поля формы из ВАШЕГО типа файла
  getValue: (file: FileType) => any,
}

export const CoreFormikImageField = function <FileType, ValueType>(
  {
    label,
    name,
    helperText,
    uploadFiles,
    getValue,
    deleteFile,
    useFile,
  }: CoreFormikImageFieldProps<FileType, ValueType>) {
  const formik = useFormikContext<any>();

  const value = formik.values[name];

  const {getRootProps, getInputProps, isDragActive, open} = useDropzone({
    onDrop: (...args) => {
      n_promise(uploadFiles(...args)
          .then(result => {
            formik.setFieldValue(name, getValue(result[0]))
          })
        , {
          pending: "Загрузка файла"
        });
    },
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    multiple: false,
  });

  const handleDelete = useCallback((value: any) => {
    deleteFile(value)
      .then(() => formik.setFieldValue(name, null))
      .catch(n_error)
  }, [name, deleteFile, formik]);

  return <FormControl
    fullWidth
    disabled={formik.isSubmitting}
    error={(formik.touched[name] || formik.submitCount > 0) && !!formik.errors[name]}
    className={'flex flex-col gap-2 items-start'}
  >
    <Typography color={'textSecondary'} fontSize={'small'}>{label}</Typography>

    {!value && <Button variant={'outlined'} onClick={() => open()}>Загрузить изображение</Button>}

    {value && <FilePreview value={value} useFile={useFile} handleDelete={handleDelete}/>}

    {helperText && <FormHelperText>{helperText}</FormHelperText>}

    <input {...getInputProps()} />
  </FormControl>
}

const FilePreview = (
  {value, useFile, handleDelete}:
    {
      value: any,
      useFile: CoreFormikImageFieldProps<any, any>['useFile']
      handleDelete: (value: any) => any
    }
) => {
  const {file, isLoading} = useFile(value);

  return <div className={'w-[100px]'}>
    {isLoading ? <Preloader/> : file ? <div className={'flex flex-col gap-2'}>
        <div className={'w-[100px] h-[100px]'}>
          <NextLink href={file.link} target={'_blank'}>
            <img src={file.link} alt={file.filename}/>
          </NextLink>
        </div>
        <div className={'text-gray-500 text-sm'}>{file.filename}</div>
        <Button variant={'outlined'} color={'error'} onClick={() => handleDelete(value)}>Удалить</Button>

      </div>
      : `Не найден файл`}
  </div>
}

// Пример частного компонента проекта
// import {useAdminCreateFileMutation, useAdminDeleteFileMutation} from "@/services/api/adminFileApi";
// import {IS_DEV} from "@/core/constants";
// import {CoreFormikImageField, CoreFormikImageFieldProps} from "@/core/formik/fields/CoreFormikImageField";
// import {File} from '@/services/types/file'
// import {useGetFileQuery} from "@/services/api/_api";
//
// export type FormikImageFieldProps = Omit<CoreFormikImageFieldProps<File, string>, 'uploadFiles' | 'deleteFile' | 'useFile' |  'getValue'>
//
// const FormikImageField = (props: FormikImageFieldProps) => {
//   const [createFile, {}] = useAdminCreateFileMutation();
//   const [deleteFile] = useAdminDeleteFileMutation();
//
//   return <CoreFormikImageField<File, string>
//     uploadFiles={async (files) => {
//       const formData = new FormData();
//       formData.append(`file`, files[0]);
//       formData.append(`cdnKeyPrefixWithSlash`, `${IS_DEV ? 'dev/' : ""}formikimages/`);
//       return [await createFile(formData).unwrap()]
//     }}
//     getValue={(file) => file.uid}
//     deleteFile={uid => deleteFile({uid}).unwrap()}
//     useFile={useFile}
//     {...props}
//   />
// };
//
// function useFile(value: any) {
//   const {data, isLoading} = useGetFileQuery(value);
//   return {file: data, isLoading};
// }
//
// export default FormikImageField;
