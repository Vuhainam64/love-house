import { useEffect, useState, Fragment } from "react";
import { Modal } from "../../../components";
import {
  createConstructionConfig,
  getMaxConfig,
} from "../../../constants/apiConstructionConfig";
import { Button } from "antd";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import BaseButton from "../../../components/Button/BaseButton";

const ConstructionConfigForProject = ({
  showModal,
  setShowModal,
  fetchData,
}) => {
  const handleButtonClick = () => {
    setShowModal(true);
  };
  const [maxData, setMaxData] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Initialize loading state
  const [constructionType, setConstructionType] = useState(0); // State to store constructionType

  const fetchMax = async () => {
    const result = await getMaxConfig(0);
    console.log(result);
    if (result.isSuccess) {
      setMaxData(result.result.data);
    }
  };
  const handleChange = async (e) => {
    const selectedConstructionType = e.target.value;
    setConstructionType(selectedConstructionType);
    try {
      console.log(e.target.value);
      const maxConfig = await getMaxConfig(selectedConstructionType);
      setMaxData(maxConfig.result.data);
    } catch (error) {
      console.error("Error fetching min area data:", error);
    }
  };

  useEffect(() => {
    fetchMax();
  }, []);

  const validationSchema = Yup.object().shape({
    sandMixingRatio: Yup.number()
      .moreThan(0, "sandMixingRatio must be more than 0")
      .required("Required"),
    cementMixingRatio: Yup.number()
      .moreThan(0, "cementMixingRatio must be more than 0")
      .required("Required"),
    stoneMixingRatio: Yup.number()
      .moreThan(0, "stoneMixingRatio must be more than 0")
      .required("Required"),
    constructionType: Yup.number().required("Required"),
    numOfFloorMin: Yup.number()
      .moreThan(0, "numOfFloorMin must be more than 0")
      .required("Required"),
    numOfFloorMax: Yup.number()
      .moreThan(0, "numOfFloorMax must be more than 0")
      .required("Required"),
    areaMin: Yup.number()
      .moreThan(0, "areaMin must be more than 0")
      .required("Required"),
    areaMax: Yup.number()
      .moreThan(Yup.ref("areaMin"), "areaMax must be more than areaMin")
      .required("Required"),
    tiledAreaMin: Yup.number()
      .moreThan(0, "tiledAreaMin must be more than 0")
      .required("Required"),
    tiledAreaMax: Yup.number()
      .moreThan(
        Yup.ref("tiledAreaMin"),
        "tiledAreaMax must be more than tiledAreaMin"
      )
      .required("Required"),
  });

  const initialValues = {
    sandMixingRatio: 0,
    cementMixingRatio: 0,
    stoneMixingRatio: 0,
    constructionType: constructionType,
    numOfFloorMin: maxData.numOfFloorMax,
    numOfFloorMax: 0,
    areaMin: maxData.areaMax,
    areaMax: 0,
    tiledAreaMin: maxData.tiledAreaMax,
    tiledAreaMax: 0,
  };

  return (
    <>
      <Fragment>
        <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
          <div className="max-w-[700px] font-normal p-4 my-auto lg:px-8 text-left overflow-y-auto max-h-[500px] scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  console.log(values);
                  const formatData = {
                    sandMixingRatio: values.sandMixingRatio,
                    cementMixingRatio: values.cementMixingRatio,
                    stoneMixingRatio: values.stoneMixingRatio,
                    constructionType: Number(constructionType),
                    numOfFloorMin: values.numOfFloorMin,
                    numOfFloorMax: values.numOfFloorMax,
                    areaMin: values.areaMin,
                    areaMax: values.areaMax,
                    tiledAreaMin: values.tiledAreaMin,
                    tiledAreaMax: values.tiledAreaMax,
                  };
                  setIsLoading(true); // Set loading state to true when submitting form

                  const result = await createConstructionConfig(formatData);
                  console.log(result);
                  if (result.isSuccess) {
                    toast.success("Create successfully");
                    setShowModal(false);
                    fetchData();
                  } else {
                    for (var i = 0; i < result.messages.length; i++) {
                      toast.error(result.messages[i]);
                    }
                  }
                } catch (error) {
                  console.error("Error updating project config:", error);
                } finally {
                  setIsLoading(false); // Set loading state to false after API call is complete
                  setSubmitting(false);
                }
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="flex flex-col my-3 mx-2">
                    <h2 className="text-lg font-semibold mb-4 text-center uppercase">
                      Create Construction Config
                    </h2>

                    <label htmlFor="sandMixingRatio" className="text-base">
                      Sand Mixing Ratio:
                    </label>
                    <Field
                      name="sandMixingRatio"
                      type="number"
                      className="border border-gray-300 p-2 rounded-md"
                    />
                    <ErrorMessage
                      name="sandMixingRatio"
                      component="div"
                      className="text-red-600"
                    />

                    <label htmlFor="cementMixingRatio" className="text-base">
                      Cement Mixing Ratio:
                    </label>
                    <Field
                      name="cementMixingRatio"
                      type="number"
                      className="border border-gray-300 p-2 rounded-md"
                    />
                    <ErrorMessage
                      name="cementMixingRatio"
                      component="div"
                      className="text-red-600"
                    />

                    <label htmlFor="stoneMixingRatio" className="text-base">
                      Stone Mixing Ratio:
                    </label>
                    <Field
                      name="stoneMixingRatio"
                      type="number"
                      className="border border-gray-300 p-2 rounded-md"
                    />
                    <ErrorMessage
                      name="stoneMixingRatio"
                      component="div"
                      className="text-red-600"
                    />

                    <label htmlFor="constructionType" className="text-base">
                      Construction Type:
                    </label>
                    <Field
                      as="select"
                      name="constructionType"
                      className="border border-gray-300 p-2 rounded-md"
                      onChange={handleChange} // Call handleChange when constructionType changes
                      value={constructionType}
                    >
                      <option value={0}>Rough Construction</option>
                      <option value={1}>Complete Construction</option>
                    </Field>
                    <ErrorMessage
                      name="constructionType"
                      component="div"
                      className="text-red-600"
                    />

                    <label htmlFor="numOfFloorMin" className="text-base">
                      Minimum Number of Floors:
                    </label>
                    <Field
                      name="numOfFloorMin"
                      type="number"
                      className="border border-gray-300 p-2 rounded-md"
                      value={initialValues.numOfFloorMin}
                    />
                    <ErrorMessage
                      name="numOfFloorMin"
                      component="div"
                      className="text-red-600"
                    />

                    <label htmlFor="numOfFloorMax" className="text-base">
                      Maximum Number of Floors:
                    </label>
                    <Field
                      name="numOfFloorMax"
                      type="number"
                      className="border border-gray-300 p-2 rounded-md"
                    />
                    <ErrorMessage
                      name="numOfFloorMax"
                      component="div"
                      className="text-red-600"
                    />

                    <label htmlFor="areaMin" className="text-base">
                      Minimum Area:
                    </label>
                    <Field
                      name="areaMin"
                      type="number"
                      className="border border-gray-300 p-2 rounded-md"
                      value={initialValues.areaMin}
                    />
                    <ErrorMessage
                      name="areaMin"
                      component="div"
                      className="text-red-600"
                    />

                    <label htmlFor="areaMax" className="text-base">
                      Maximum Area:
                    </label>
                    <Field
                      name="areaMax"
                      type="number"
                      className="border border-gray-300 p-2 rounded-md"
                    />
                    <ErrorMessage
                      name="areaMax"
                      component="div"
                      className="text-red-600"
                    />

                    <label htmlFor="tiledAreaMin" className="text-base">
                      Minimum Tiled Area:
                    </label>
                    <Field
                      name="tiledAreaMin"
                      type="number"
                      className="border border-gray-300 p-2 rounded-md"
                      value={initialValues.tiledAreaMin}
                    />
                    <ErrorMessage
                      name="tiledAreaMin"
                      component="div"
                      className="text-red-600"
                    />

                    <label htmlFor="tiledAreaMax" className="text-base">
                      Maximum Tiled Area:
                    </label>
                    <Field
                      name="tiledAreaMax"
                      type="number"
                      className="border border-gray-300 p-2 rounded-md"
                    />
                    <ErrorMessage
                      name="tiledAreaMax"
                      component="div"
                      className="text-red-600"
                    />
                    <button
                      htmlType="submit"
                      className="text-white bg-green-600 rounded font-semibold p-2 mt-5 hover:bg-green-400"
                      loading={isLoading}
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Modal>
      </Fragment>
    </>
  );
};
export default ConstructionConfigForProject;
