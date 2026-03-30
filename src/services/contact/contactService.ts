import api from '../api';

export const apiSubmitContact = async (contactData: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) => {
  try {
    const response = await api.post('/contact/submit', contactData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: 'Failed to send message' };
  }
};
