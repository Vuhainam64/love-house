import React, { useEffect, useState } from 'react';
import { Modal, Table } from 'antd';
import moment from 'moment';
import { getAllExportByQuotationDetailId } from '../../../api';

const ViewExportQuotationModal = ({ visible, data, onClose }) => {
    const [list, setList] = useState([])
    const fetchData = async () => {
        const result = await getAllExportByQuotationDetailId(data);
        if (result.isSuccess) {
            setList(result.result.data)
        }
    }

    useEffect(() => {

        fetchData()
    }, [data])



    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            render: (text) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
        },
       
    ];

    return (
        <Modal
            title="List Export Material"
            visible={visible}
            onCancel={onClose}
            footer={null}
            width={800} // Responsive width
        >
            <Table
                columns={columns}
                dataSource={list}
                pagination={false}
                scroll={{ y: 400 }} // Responsive height
            />
        </Modal>
    );
};

export default ViewExportQuotationModal;
