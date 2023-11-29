import { useModal } from "../../../../hooks/useModal";
import { IItem } from "../../../../redux/services/item/itemApi.interface";
import EditItemForm from "./components/EditItemForm";

export default function EditDataModal({data}:{data:IItem}) {
  const { ModalBox ,setOpenModal} = useModal();
  return (
    <ModalBox
    triggerButtonText="Edit"
    triggerButtonProps={{ size: 'small', type: 'primary' }}
    footer={null}
    title="Edit Item"
    maskClosable={false}
    children = {<EditItemForm data={data} setOpenModal={setOpenModal}/>}
    destroyOnClose
  />
  )
}
