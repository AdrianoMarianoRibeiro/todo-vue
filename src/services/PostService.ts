import API from "@/api";

export default {
  async findAll(page = 1, limit = 10) {
    const response = await API.get(`/post?page=${page}&limit=${limit}`);
    const { items, meta } = response.data.data;
    return { items, meta };
  },

  async create(payload: { post: string; userId: string }) {
    const response = await API.post("post", payload);
    return response.data;
  },

  async update(id: string, payload: { post: string; userId: string }) {
    const response = await API.put(`post/${id}`, payload);
    return response.data;
  },

  async delete(id: string) {
    const response = await API.delete(`post/${id}`);
    return response.data;
  },
};
