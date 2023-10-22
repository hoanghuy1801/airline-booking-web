import React, { useState } from 'react'
import { Button, Modal } from 'antd'

const MyForm = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const showModal = () => {
        setIsModalOpen(true)
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }

    return (
        <>
            <Button type='primary' onClick={showModal}>
                Open Modal
            </Button>
            <Modal
                title='Your Modal Title'
                visible={isModalOpen}
                onOk={handleCancel} // Gán hàm handleCancel cho sự kiện "OK"
                onCancel={handleCancel} // Gán hàm handleCancel cho sự kiện "Cancel"
                footer={null} // Bỏ footer
            >
                Some contents... Some contents... Some contents...
            </Modal>
        </>
    )
}

export default MyForm
