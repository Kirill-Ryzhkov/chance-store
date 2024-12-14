import React, { useState, useEffect } from 'react';
import { useUpdateProductMutation } from '../../../services/redux/apiSlice';
import { useNavigate } from 'react-router-dom';

const IMAGE_URL = process.env.REACT_APP_IMAGE_SERVER;

export default function EditMain({ product }) {
    const navigate = useNavigate();
    const [updateProduct] = useUpdateProductMutation();
    const excludedFields = ["createdAt", "updatedAt", "__v", "_id"];
    const [formData, setFormData] = useState(product || {});
    const [imagePreview, setImagePreview] = useState(
        product?.image ? `${IMAGE_URL}${product.image}` : ""
    );

    useEffect(() => {
      if (product) {
        setFormData(product);
        setImagePreview(product.image ? `${IMAGE_URL}${product.image}` : "");
      }
    }, [product]);

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

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('slug', formData.slug);
        formDataToSend.append('type', formData.type);
        formDataToSend.append('price', formData.price);
        if (formData.image instanceof File) {
          formDataToSend.append('image', formData.image);
        }

        try {
          await updateProduct({ id: product._id, data: formDataToSend }).unwrap();
          navigate('/admin/cafe');
        } catch (error) {
          console.error('Error updating product:', error);
        }
    };

    const handleCancel = () => {
      navigate('/admin/cafe');
    }

  return (
      <div className="flex-1 p-8 regular-not-bold-font">
        <h2 className="text-4xl mb-6">Edit</h2>
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-lg shadow-md max-w-lg"
        >
          {Object.entries(formData)
            .filter(([key]) => !excludedFields.includes(key))
            .map(([key, value]) => (
              <div key={key} className="mb-4">
                <label className="text-xl block mb-2 capitalize" htmlFor={key}>
                  {key.replace(/_/g, " ")}
                </label>

                {key === "image" ? (
                    <>
                        <input
                            type="file"
                            id={key}
                            name={key}
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
                    type={typeof value === "number" ? "number" : "text"}
                    id={key}
                    name={key}
                    value={value}
                    onChange={handleChange}
                    className="w-full px-4 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>
            ))}

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
            >
              Save
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