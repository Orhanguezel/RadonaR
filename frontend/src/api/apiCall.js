import api from './api'

export const apiCall = async ({ url, method, data, params }) => {
  try {
    const response = await api({
      url,
      method,
      data,
      params,
    })
    return response.data
  } catch (error) {
    throw error.response?.data || error
  }
}



//  await apiCall({ url: '/products', method: 'GET' })

