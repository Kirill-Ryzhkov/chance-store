import React, { useState, useEffect } from 'react';
import { useCreateProductMutation } from '../../../services/redux/apiSlice';
import { useNavigate } from 'react-router-dom';

export default function CreateMain({ product }) {
    const navigate = useNavigate();
    const [fields, setFields] = useState([]);

    const [createProduct] = useCreateProductMutation();

    useEffect(() => {
        const excludedFields = ["createdAt", "updatedAt", "__v", "_id"];
        if (product) {
            const newFields = Object.keys(product)
                .filter((key) => !excludedFields.includes(key));
            setFields(newFields);
        }
    }, [product]);

    
    const initialFormData = fields.reduce((acc, field) => {
        acc[field.name] = field.type === 'file' ? null : '';
        return acc;
    }, {});

    const [formData, setFormData] = useState(initialFormData);
    const [imagePreview, setImagePreview] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setFormData({ ...formData, image: file });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('New Product:', formData);

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('slug', formData.slug);
        formDataToSend.append('type', formData.type);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('image', formData.image);

        try {
            await createProduct(formDataToSend).unwrap();
            navigate('/admin/cafe');
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    const handleCancel = () => {
        navigate('/admin/cafe');
    }

  return (
    <div className="flex-1 p-8 regular-not-bold-font">
       <h2 className="text-4xl mb-6">Create New Product</h2>
       <form className="p-6 rounded-lg shadow-md max-w-lg" onSubmit={handleSubmit}>
         {fields.map((field, index) => (
          <div key={index} className="mb-4">
            <label className="text-xl block mb-2 capitalize" htmlFor={field}>
              {field}
            </label>

            {field === 'image' ? (
              <>
                <input
                  type="file"
                  id={field}
                  name={field}
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Product Preview"
                    className="w-60 h-60 object-cover rounded-lg mt-4"
                  />
                )}
              </>
            ) : (
              <input
                type={field}
                id={field}
                name={field}
                onChange={handleChange}
                className="w-full px-4 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          </div>
        ))}

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
          >
            Create
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-200 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}