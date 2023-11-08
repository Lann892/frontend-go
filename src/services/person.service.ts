import { headerAPI, api } from "@/config/axios";
import { IPerson } from "@/interfaces/Person";

export class PersonService {
  private apiURL = "v1/persons";

  public async getAll() {
    try {
      console.log("Consulta de personas");
      const response = await api.get<IPerson[]>(`${this.apiURL}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async post(data: IPerson) {
    try {
      const response = await api.post<IPerson>(
        `${this.apiURL}`,
        data,
        headerAPI
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async getById(id: number) {
    try {
      const response = await api.get<IPerson>(
        `${this.apiURL}/${id}`,
        headerAPI
      );
      const data: IPerson = response.data;
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async put(data: IPerson) {
    try {
      const response = await api.put<IPerson>(
        `${this.apiURL}/${data.id}`,
        data,
        headerAPI
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async delete(data: IPerson) {
    try {
      const response = await api.delete<IPerson>(
        `${this.apiURL}/${data.id}`,
        headerAPI
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
