/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { App, Button, Form, Input } from "antd";

import {
  IFormData,
} from "../../../../../redux/services/item/itemApi.interface";
import { useCreateItemMutation } from "../../../../../redux/services/item/itemApi";

export default function AddTransactionForm({setOpenModal}:{setOpenModal:React.Dispatch<React.SetStateAction<boolean>>}) {
  const [form] = Form.useForm();
  const { message } = App.useApp();

  const [createItem,{error,isLoading}] = useCreateItemMutation();

  const handleSubmit = async (values: IFormData) => {
    form.validateFields();
    createItem(values)
    .unwrap()
    .then((_payload) => {message.success('Item created Successfully !');setOpenModal(false)})
    .catch((error) => {message.error(error.data.message);setOpenModal(false)})
    .finally(()=>setOpenModal(false))
  };
  
  return (
    <Form
      form={form}
      layout="vertical"
      validateTrigger={["onBlur"]}
      size="large"
      onFinish={handleSubmit}
    >
      <Form.Item<IFormData> 
      label="Id" 
      name="id"
      required
        rules={[
          {
            required: true,
            type: 'string',
            message: 'Id is required',
          },
          {
            warningOnly: true,
            validator: () => {
              if (error && 'data' in error && error.status === 404) {
                return Promise.reject(new Error(error.data.message));
              }
              return Promise.resolve();
            }
          }
        ]}
      >
        
        <Input placeholder="Enter item id" type="text" />
      </Form.Item>
      <Form.Item<IFormData> label="Name" name="name"
       required
       rules={[
         {
           required: true,
           message: 'Name is required',
         },
         {
           warningOnly: true,
           validator: () => {
             if (error && 'data' in error && error.status === 404) {
               return Promise.reject(new Error(error.data.message));
             }
             return Promise.resolve();
           }
         }
       ]}
      >
        <Input placeholder="Enter item name" type="text" />
      </Form.Item>
      <Form.Item<IFormData>>
        <Button
          type="primary"
          block
          loading={isLoading}
          htmlType="submit"
          size="large"
          shape="round"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
