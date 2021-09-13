import { validate } from 'class-validator';

// const errors = validateSync(newTuteeListing, {
//   forbidUnknownValues: true,
// });
// if (errors) {
//   //     errors.map((err) => ({
//   //   field: err.property,
//   //   detail: Object.values((err as any).constraints),
//   // }))
//   throw new Exception(
//     errors.map((err) => ({
//       field: err.property,
//       detail: Object.values((err as any).constraints) as string[],
//     }))
//   );
// }
// validateOrReject(newTuteeListing, {
//   forbidUnknownValues: true,
// }).catch((err) => {
//   throw new Error(err);
// });
// console.log(
//   errors.map((err) => ({
//     field: err.property,
//     detail: Object.values((err as any).constraints),
//   }))
// );

const CREATE_OPTIONS = { forbidUnknownValues: true };

const UPDATE_OPTIONS = {
  forbidUnknownValues: true,
  skipMissingProperties: true,
};

// const classValidate = (obj: any, isCreate: boolean) => {
//   // Object.assign(newTuteeListing, tuteeListing);
//   const option = isCreate ? CREATE_OPTIONS : UPDATE_OPTIONS;
//   const errors = validateSync(obj, option);
//   console.log(errors);

//   if (errors.length !== 0) {
//     //     errors.map((err) => ({
//     //   field: err.property,
//     //   detail: Object.values((err as any).constraints),
//     // }))
//     throw new Exception(
//       errors.map((err) => ({
//         field: err.property,
//         detail: Object.values((err as any).constraints) as string[],
//       }))
//     );
//   }
// };

const classValidate = (obj: any, isCreate: boolean) => {
  // Object.assign(newTuteeListing, tuteeListing);
  const option = isCreate ? CREATE_OPTIONS : UPDATE_OPTIONS;
  // const errors = validateSync(obj, option);
  //   console.log(errors);

  return validate(obj, option).then((errors) =>
    errors.map((err) => ({
      field: err.property,
      detail: Object.values((err as any).constraints) as string[],
    }))
  );
  // if (errors.length !== 0) {
  //   //     errors.map((err) => ({
  //   //   field: err.property,
  //   //   detail: Object.values((err as any).constraints),
  //   // }))
  //   throw new Exception(
  //     errors.map((err) => ({
  //       field: err.property,
  //       detail: Object.values((err as any).constraints) as string[],
  //     }))
  //   );
  // }
};

export default classValidate;
