import * as Yup from "yup";

export const projectConfigValidationSchema = Yup.object().shape({
  tiledArea: Yup.number()
    .required("'The TiledArea' must not be empty")
    .moreThan(0, "'The TiledArea' must be greater than 0"),

  wallLength: Yup.number()
    .required("'Wall Length' must not be empty")
    .moreThan(0, "'Wall Length' must be greater than 0"),

  wallHeight: Yup.number()
    .required("'Wall Height' must not be empty")
    .moreThan(0, "'Wall Height' must be greater than 0"),

  estimatedTimeOfCompletion: Yup.number()
    .required("'Estimated Time Of Completion' must not be empty")
    .integer("'Estimated Time Of Completion' must be an integer")
    .moreThan(0, "'Estimated Time Of Completion' must be greater than 0"),

  laborRequests: Yup.array().of(
    Yup.object().shape({
      exportLaborCost: Yup.number()
      // .test(
      //   "greater-than-labor-cost",
      //   "Export Labor Cost must be greater than Worker's Labor Cost",
      //   function (value) {
      //     const selectedWorkerId = this.parent.workerPriceId;
      //     const selectedWorker = workers.find(
      //       (worker) => worker.id === selectedWorkerId
      //     );
      //     const laborCost = selectedWorker ? selectedWorker.laborCost : 0;
      //     return value > laborCost;
      //   }
      // )
        .required("'Export Labor Cost' must not be empty")
        .moreThan(0, "'Export Labor Cost' must be greater than 0"),
      quantity: Yup.number()
        .required("'Quantity' must not be empty")
        .moreThan(0, "'Quantity' must be greater than 0"),
      workerPriceId: Yup.string().required("'Worker' must be selected"),
    })
  ),
});