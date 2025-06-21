import API from "@/api";

export default {
  async findAll(page = 1, limit = 10) {
    const response = await API.get(`/user?page=${page}&limit=${limit}`);
    const { items, meta } = response.data.data;
    return { items, meta };
  },

  async create(payload: { name: string; email: string; password: string }) {
    const response = await API.post("user", payload);
    return response.data;
  },

  async update(id: string, payload: { name: string; email: string }) {
    const response = await API.put(`user/${id}`, payload);
    return response.data;
  },

  async delete(id: string) {
    const response = await API.delete(`user/${id}`);
    return response.data;
  },

  async getAll() {
    const response = await API.get(`/user/get-all`);
    return response.data;
  },
};
