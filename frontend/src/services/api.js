const API_URL = '/api';
const TIMEOUT_MS = 30000;

function createApiError(message, status, data) {
  const error = new Error(message);
  error.status = status;
  error.data = data;
  return error;
}

async function fetchWithTimeout(input, init) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(input, {
      ...init,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

export async function evaluateTask(formData) {
  try {
    const response = await fetchWithTimeout(`${API_URL}/evaluations`, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw createApiError(
        errorData?.message || 'Failed to evaluate task',
        response.status,
        errorData
      );
    }

    const data = await response.json();
    if (!data || typeof data !== 'object') {
      throw createApiError('Invalid response format');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('API Error:', error.message);
    }
    throw error;
  }
}

export async function fetchEvaluationHistory() {
  try {
    const response = await fetchWithTimeout(`${API_URL}/evaluations`, {
      headers: {
        'Accept': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw createApiError(
        errorData?.message || 'Failed to fetch evaluation history',
        response.status,
        errorData
      );
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      throw createApiError('Invalid response format');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('API Error:', error.message);
    }
    throw error;
  }
}

export async function fetchEvaluationById(id) {
  try {
    const response = await fetchWithTimeout(`${API_URL}/evaluations/${id}`, {
      headers: {
        'Accept': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw createApiError(
        errorData?.message || 'Failed to fetch evaluation',
        response.status,
        errorData
      );
    }

    const data = await response.json();
    if (!data || typeof data !== 'object') {
      throw createApiError('Invalid response format');
    }

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('API Error:', error.message);
    }
    throw error;
  }
}