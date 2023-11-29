import { useUpdateItemMutation } from "../../../../../redux/services/item/itemApi";
import { IFormData, IItem } from "../../../../../redux/services/item/itemApi.interface";
import { Button, Form, Input, message } from "antd";

export default function EditItemForm({data,setOpenModal}:{data:IItem,setOpenModal:React.Dispatch<React.SetStateAction<boolean>>}) {
    const [form] = Form.useForm();
  
    const [updateItem,{isLoading,error}] = useUpdateItemMutation()

    const handleSubmit = async (values: IFormData) => {
      form.validateFields();
       updateItem({id:data.id,data:values})
      .unwrap()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then((_payload) => {message.success('Item updated successfully !');setOpenModal(false)})
      .catch((error) => {message.error(error.data.message);setOpenModal(false)})
      .finally(()=>setOpenModal(false))
    }
  
    
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
        initialValue={data.id}
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
          
          <Input placeholder="Enter item id" defaultValue={data.id} type="text" />
        </Form.Item>
        <Form.Item<IFormData> label="Name" name="name"
         required
         initialValue={data.name}
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
          <Input placeholder="Enter item name" defaultValue={data.name} type="text" />
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
            Update
          </Button>
        </Form.Item>
      </Form>
    );
  }
  
