import { useState, useEffect } from "react";
import Table from "antd/es/table";
import Select from "antd/es/select";
const { Option } = Select;
import dataTable from "./utils/dataTable";
import Page from "../../../../components/pageWrapper/Page";

import AddDataModal from "./AddDataModal";
import { App } from "antd";
import { IItem } from "../../../../redux/services/item/itemApi.interface";
import LoadingScreen from "../../../../components/loaders/LoadingScreen";
import {
  useDeleteItemMutation,
  useGetAllItemQuery,
} from "../../../../redux/services/item/itemApi";
import Search from "antd/es/input/Search";

export default function Items() {
  const [item, setItem] = useState<IItem[]>([]);
  const [searchData, setSearchData] = useState<string | "">("");
  const [filterData, setFilterData] = useState<string | "">("");
  const [dataLimit, setDataLimit] = useState<number>(6);

  const { message } = App.useApp();
  const { data, isLoading, isSuccess, error,isFetching } = useGetAllItemQuery(
    {
      searchData,
      filterData,
      limit: dataLimit,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );
  
  const [deleteItem, { isLoading: delLoading, isSuccess: delSuccess,error:delError }] =
    useDeleteItemMutation();

  useEffect(() => {
    if (data?.data) {
      setItem(dataTable.getData(data.data));
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      message.error(
        (error && "data" in error && error?.data?.message) ||
          "Something went wrong"
      );
    }
  }, [isSuccess, error, message, data]);

  useEffect(() => {
    if (delSuccess) {
      message.success("Deleted successfully !");
    }
    if (delError) {
      message.error(
        (delError && "data" in delError && delError?.data?.message) ||
          "Something went wrong"
      );
    }
  }, [delError, delSuccess, message]);

  if (isLoading) {
    return <LoadingScreen />;
  }


  const handleDataLimitChange = (value: number) => {
    setDataLimit(value);
  };

  return (
    <Page heading="Items" content={<AddDataModal />}>
      <div className="bg-white pb-4 h-full">
        <div className="flex items-center gap-4 m-[20px] lg:flex-row flex-col">
          <Search
            placeholder="input search text"
            value={searchData}
            onChange={(e)=>{setSearchData(e.target.value); setFilterData("");}}
            style={{ width: "100%" }}
          />
          <Search
            value={filterData}
            placeholder="Input filter text"
            onChange={(e)=>{setFilterData(e.target.value); setSearchData("");}}
            style={{ width: "100%" }}
          />
          <Select
            style={{ width: "100%" }}
            value={dataLimit}
            onChange={(value) => handleDataLimitChange(value)}
          >
             <Option value={6}>06</Option>
            <Option value={10}>10</Option>
            <Option value={20}>20</Option>
            <Option value={50}>50</Option>
            <Option value={data?.meta?.total || 100}>All</Option>
          </Select>
        </div>
        <Table 
        columns={dataTable.getColums(deleteItem)} 
        dataSource={item}  
        pagination={{
          pageSize: 6
        }}
        loading={isFetching || delLoading} 
        />
      </div>
    </Page>
  );
}
