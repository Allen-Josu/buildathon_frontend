import { Button, Form, Input, Select } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_URL;
import { v4 as uuid } from "uuid";

function Signup() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const courseOptions = [
    { value: 'computer_science', label: 'Computer Science' },
    { value: 'information_technology', label: 'Information Technology' },
    { value: 'data_science', label: 'Data Science' },
    { value: 'cybersecurity', label: 'Cybersecurity' },
    { value: 'software_engineering', label: 'Software Engineering' },
  ];

  const handleSubmit = async (values) => {
    setError('');
    setLoading(true);
  
    try {
      // Remove confirmPassword before sending data to the backend
      const { confirmPassword, ...dataToSend } = values;
  
      const response = await axios.post(`${BASE_URL}/users/`, {
        ...dataToSend,
        entityId: uuid(),
        entity: 'users',
        role: 'user',
        department: 'DCA',
      });
  
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        'An error occurred during registration'
      );
    } finally {
      setLoading(false);
    }
  };
  

  // Responsive form layout
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
      md: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14, offset: 2 },
      md: { span: 16, offset: 2 },
    },
  };

  const inputStyle = {
    backgroundColor: '#f1f1f1',
    border: '1px solid #6a0dad',
    borderRadius: '5px',
    width: '100%',
  };

  const containerStyle = {
    backgroundColor: 'black',
    minHeight: '100vh',
    padding: '2rem',
    overflowY: 'auto',
  };

  const scrollbarStyles = `
    .custom-scrollbar::-webkit-scrollbar {
      width: 8px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }
    
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background-color: #6a0dad;
      border-radius: 4px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
      background-color: #580b87;
    }

    .ant-form-item-label {
      text-align: left !important;
      padding-left: 1rem !important;
    }

    @media (max-width: 576px) {
      .ant-form-item-label {
        padding-left: 0 !important;
      }
      
      .signup-button {
        width: 100% !important;
        max-width: none !important;
      }
    }

    .signup-card {
      max-width: 800px;
      margin: 0 auto;
    }
  `;

  return (
    <>
      <style>{scrollbarStyles}</style>
      <div style={containerStyle} className="custom-scrollbar">
        <div className="container-fluid py-4">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8">
              <div
                className="card signup-card"
                style={{
                  backgroundColor: 'white',
                  color: 'black',
                  borderRadius: '10px',
                  padding: '1.5rem',
                }}
              >
                <div className="card-body">
                  <h2 className="card-title text-center mb-4">Sign Up</h2>
                  {error && (
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  )}
                  <Form
                    {...formItemLayout}
                    form={form}
                    onFinish={handleSubmit}
                    layout="horizontal"
                    className="px-3"
                  >
                    <Form.Item
                      name="username"
                      label="Username"
                      rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                      <Input
                        style={inputStyle}
                        autoComplete="off"
                      />
                    </Form.Item>

                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        { required: true, message: 'Please input your email!' },
                        { type: 'email', message: 'Please enter a valid email!' }
                      ]}
                    >
                      <Input
                        style={inputStyle}
                        autoComplete="off"
                      />
                    </Form.Item>

                    <Form.Item
                      name="studentId"
                      label="Student-ID"
                      rules={[{ required: true, message: 'Please input your student ID!' }]}
                    >
                      <Input style={inputStyle} />
                    </Form.Item>

                    <Form.Item
                      name="course"
                      label="Course"
                      rules={[{ required: true, message: 'Please select your course!' }]}
                    >
                      <Select
                        style={inputStyle}
                        options={courseOptions}
                      />
                    </Form.Item>

                    <Form.Item
                      name="password"
                      label="Password"
                      rules={[
                        { required: true, message: 'Please input your password!' },
                        { min: 6, message: 'Password must be at least 6 characters long!' }
                      ]}
                    >
                      <Input.Password style={inputStyle} />
                    </Form.Item>

                    <Form.Item
                      name="confirmPassword"
                      label="Confirm Password"
                      dependencies={['password']}
                      rules={[
                        { required: true, message: 'Please confirm your password!' },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(new Error('Passwords do not match!'));
                          },
                        }),
                      ]}
                    >
                      <Input.Password style={inputStyle} />
                    </Form.Item>

                    <div className="d-flex justify-content-center w-100 pt-3">
                      <Button
                        type="primary"
                        htmlType="submit"
                        disabled={loading}
                        className="signup-button px-4"
                        style={{
                          backgroundColor: '#6a0dad',
                          borderColor: '#6a0dad',
                          maxWidth: '100%',
                        }}
                      >
                        {loading ? 'Signing up...' : 'Sign Up'}
                      </Button>
                    </div>
                  </Form>
                  <div className="text-center mt-4">
                    <p className="mb-0">
                      Already have an account?{' '}
                      <Link to="/login" style={{ color: '#6a0dad' }}>
                        Click here to log in
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;