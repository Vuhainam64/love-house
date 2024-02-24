import React, { useEffect, useState, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { Formik, Form, FieldArray, Field, ErrorMessage } from "formik";
import { Input, Button } from "antd";

import Modal from "../../../components/Modal/Modal"
import { alert } from "../../../components/Alert/Alert"

import { getProjectByIdForCustomer } from "../../../constants/apiQuotationOfCustomer"

export default function SignContractForm() {
    const [showModal, setShowModal] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const [projectDetail, setProjectDetail] = useState({});

    
  const fetchProjectDetail = async () => {
    try {
      const data = await getProjectByIdForCustomer(id);

      if (data && data.result) {
        setProjectDetail(data.result.data);
        // setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching project detail:", error);
    }
  };

  useEffect(() => {
    fetchProjectDetail();
  }, [id]);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  useEffect(() => {
    if (projectDetail.quotations && projectDetail.quotations.length > 0) {
      setInitialValues({
        contractId: projectDetail.quotations[0].id,
        rawMaterialDiscount: "",
        furnitureDiscount: "",
        laborDiscount: "",
      });
    }
  }, [projectDetail]);

  const [initialValues, setInitialValues] = useState({
    quotationId: "", // Initial value is an empty string, it will be updated in useEffect
    rawMaterialDiscount: "",
    furnitureDiscount: "",
    laborDiscount: "",
  });
  return (
    <div>SignContractForm</div>
  )
}

