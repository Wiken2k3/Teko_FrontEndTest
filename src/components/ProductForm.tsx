import { useState } from 'react';
import { Product } from '../types/product';
import { isValidNumber, isValidText } from '../utils/validation';

interface Field {
  label: string;
  name: string;
  type: string;
  required?: boolean;
  maxLength?: number;
  minValue?: number;
  maxValue?: number;
}

interface ProductFormProps {
  fields: Field[];
  onSubmit: (product: Product) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ fields, onSubmit }) => {
  const [form, setForm] = useState<Record<string, string>>({});
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (name: string, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (): boolean => {
    const newErrors: string[] = [];

    for (const field of fields) {
      const value = form[field.name] || '';

      if (field.required && !value && field.type !== 'file_upload') {
        newErrors.push(`Vui lòng nhập ${field.label}`);
        continue;
      }

      if (field.type === 'text' && !isValidText(value, field.maxLength)) {
        newErrors.push(`${field.label} không hợp lệ`);
      }

      if (field.type === 'number' && !isValidNumber(value, field.minValue, field.maxValue)) {
        newErrors.push(`${field.label} không hợp lệ`);
      }
    }

    if (!file) {
      newErrors.push('Vui lòng chọn ảnh sản phẩm');
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const newProduct: Product = {
      name: form['productName'],
      price: Number(form['price']),
      imageSrc: file ? URL.createObjectURL(file) : 'https://via.placeholder.com/300x300?text=No+Image',
    };

    onSubmit(newProduct);
    setForm({});
    setFile(null);
    setErrors([]);
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: 460 }}>
      {errors.length > 0 && (
        <div className="alert alert-danger">
          {errors.map((err, idx) => (
            <div key={idx}>{err}</div>
          ))}
        </div>
      )}

      {fields.map((field) =>
        field.type !== 'file_upload' ? (
          <div className="mb-3" key={field.name}>
            <label className="form-label fw-medium">
              {field.required && <span className="text-danger">*</span>} {field.label}
            </label>
            <input
              type={field.type}
              className="form-control"
              value={form[field.name] || ''}
              onChange={(e) => handleChange(field.name, e.target.value)}
              style={{ borderRadius: 8, height: 40 }}
            />
          </div>
        ) : null
      )}

      <div className="mb-3">
        <label className="form-label fw-medium">
          <span className="text-danger">*</span> Ảnh sản phẩm
        </label> <br></br>

        {file && (
          <div className="mb-2">
            <img
              src={URL.createObjectURL(file)}
              alt="preview"
              style={{
                maxHeight: 200,
                objectFit: 'contain',
                borderRadius: 8,
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                display: 'block',
                marginBottom: 8,
              }}
            />
          </div>
        )}

        <input
          type="file"
          id="fileUpload"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          style={{ display: 'none' }}
        />

        <label
          htmlFor="fileUpload"
          style={{
            display: 'inline-block',
            borderRadius: 8,
            height: 36,
            cursor: 'pointer',
            border: '1px solid #ccc',
            backgroundColor: '#e9ecef',
            fontSize: 14,
            padding: '6px 14px',
            fontWeight: 500,
          }}
        >
          📎 Chọn tệp tin (tối đa 5MB)
        </label>
      </div>

      <div className="text-center mt-4">
        <button
          type="submit"
          className="btn"
          style={{
            backgroundColor: '#2F80ED',
            color: '#fff',
            padding: '8px 32px',
            borderRadius: 8,
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          Tạo sản phẩm
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
