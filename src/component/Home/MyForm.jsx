import { useState } from 'react'
import axios from 'axios'

function MyForm() {
    const [image, setImage] = (useState < File) | (null > null)

    const handleImageUpload = async () => {
        if (!image) {
            console.error('No file selected')
            return
        }

        const formData = new FormData()
        formData.append('image', image)

        try {
            const response = await axios.patch('http://localhost:8008/api/v1/passenger/upload-avatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log('Upload response:', response.data)
        } catch (error) {
            console.error('Upload error:', error)
        }
    }

    return (
        <div>
            <h1>Cloudinary Image Upload</h1>
            <input type='file' onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} />
            <button onClick={handleImageUpload}>Upload Image</button>
        </div>
    )
}

export default MyForm
