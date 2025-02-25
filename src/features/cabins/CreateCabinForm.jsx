import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import {useForm} from "react-hook-form";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow.jsx";
import {useCreateCabin} from "./useCreateCabin.js";
import {useEditCabin} from "./useEditCabin.js";


function CreateCabinForm({cabinToEdit = {}}) {
  const {isCreating, createCabin} = useCreateCabin();
  const {isEditing, editCabin} = useEditCabin();
  const isWorking = isCreating || isEditing;

  const {id: editId, ...editValues} = cabinToEdit;
  const isEditSession = Boolean(editId);

  const {register, handleSubmit, reset, getValues, formState} = useForm({
    defaultValues: isEditSession ? editValues : {}
  });
  const {errors} = formState;

  function onSubmit(data) {
    const image = typeof data.image === 'string'
      ? data.image
      : data.image[0];

    if (isEditSession) editCabin({
      newCabinData: {...data, image},
      id          : editId
    }, {
      onSuccess: () => {
        reset();
      },
      onError  : err => toast.error(err.message)
    });
    else createCabin({...data, image: image}, {
      onSuccess: () => {
        reset();
      },
      onError  : err => toast.error(err.message)
    });
  }

  return (<Form onSubmit={handleSubmit(onSubmit)}>
    <FormRow label="Name" errors={errors?.name?.message}>
      <Input
        type="text"
        id="name"
        disabled={isWorking}
        {...register("name", {
            required: 'This field is required'
          }
        )}
      />
    </FormRow>

    <FormRow label="Maximum Capacity" errors={errors?.number?.message}>
      <Input
        type="number"
        id="maxCapacity"
        disabled={isWorking}
        {...register("maxCapacity", {
            required: 'This field is required',
            min     : {
              value: 1, message: 'Minimum value is 1'
            }
          }
        )}
      />
    </FormRow>

    <FormRow label="Regular Price" errors={errors?.regularPrice?.message}>
      <Input
        type="number"
        id="regularPrice"
        disabled={isWorking}
        {...register("regularPrice", {
            required: 'This field is required',
            min     : {
              value: 1, message: 'Minimum value is 1'
            }
          }
        )}
      />
    </FormRow>

    <FormRow label="Discount" errors={errors?.discount?.message}>
      <Input
        type="number"
        id="discount"
        disabled={isWorking}
        defaultValue={0}
        {...register("discount", {
            required: 'This field is required',
            validate: (value) => value <= getValues().regularPrice || 'Discount must be between 0 and 100'
          }
        )}
      />
    </FormRow>

    <FormRow label="Description" errors={errors?.description?.message}>
      <Textarea
        type="number"
        id="description" disabled={isWorking}
        defaultValue=""
        {...register("description", {
            required: 'This field is required'
          }
        )}
      />
    </FormRow>

    <FormRow label="Cabin Photo">
      <FileInput
        id="image"
        disabled={isWorking}
        accept="image/*"
        type="file"
        {...register("image", {
            required: isEditSession ? false : 'This field is required'
          }
        )}
      />
    </FormRow>

    <FormRow>
      {/* type is an HTML attribute! */}
      <Button variation="secondary" type="reset">
        Cancel
      </Button>
      <Button disabled={isWorking}>
        {isEditSession
          ? 'Edit cabin'
          : 'Create new cabin'}
      </Button>
    </FormRow>
  </Form>);
}

export default CreateCabinForm;
