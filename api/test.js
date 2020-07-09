import HTTP from "@/utils/http";

export const getAppList = (data) => {
    return HTTP({
        url: '',
        data,
    }).then((res) => res.data);
};