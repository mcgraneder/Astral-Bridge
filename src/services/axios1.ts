import Axios, { AxiosRequestConfig } from "axios"

const axios = Axios.create({
    timeout: 60000,
    headers: { "Content-Type": "application/json", Accept: "application/json" }
})

const get = async<Res = unknown>(path: string, config?: AxiosRequestConfig): Promise<Res | null> => {
    try {
        const { data } = await axios.get(path, config)
        return data as Res
    } catch(error)  {
        console.log(`Get ${path}`)
        console.log(error)
        return null
    }
}

const post = async <Res = unknown, Req = unknown>(
    path: string,
    data: Req,
    config?: AxiosRequestConfig
): Promise<Res | null> => {
    try {
        const { data: recieved } = await axios.post(path, data, config);
        return recieved as Res;
    } catch (error) {
        console.log(`Get ${path}`);
        console.log(error);
        return null;
    }
};