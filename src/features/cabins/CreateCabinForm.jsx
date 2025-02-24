import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import {useForm} from "react-hook-form";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createCabin} from "../../services/apiCabins.js";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow.jsx";


function CreateCabinForm() {
  const {register, handleSubmit, reset, getValues, formState} = useForm();
  const queryClient = useQueryClient();
  const {errors} = formState;

  const {mutate, isLoading: isCreating} = useMutation({
    mutationFn: createCabin, onSuccess: () => {
      toast.success("Cabin added successfully");
      queryClient.invalidateQueries({queryKey: ['cabins']});
      reset();
    }, onError: err => toast.error(err.message)
  });


  function onSubmit(data) {
    mutate(data);
  }

  return (<Form onSubmit={handleSubmit(onSubmit)}>
    <FormRow label="Name" errors={errors?.name?.message}>
      <Input
        type="text"
        id="name"
        disabled={isCreating}
        {...register("name", {required: 'This field is required'})} />
    </FormRow>

    <FormRow label="Maximum Capacity" errors={errors?.number?.message}>
      <Input
        type="number"
        id="maxCapacity"
        disabled={isCreating}
        {...register("maxCapacity", {
          required: 'This field is required',
          min     : {
            value: 1, message: 'Minimum value is 1'
          }
        })} />
    </FormRow>

    <FormRow label="Regular Price" errors={errors?.regularPrice?.message}>
      <Input
        type="number"
        id="regularPrice"
        disabled={isCreating}
        {...register("regularPrice", {
          required: 'This field is required',
          min     : {
            value: 1, message: 'Minimum value is 1'
          }
        })} />
    </FormRow>

    <FormRow label="Discount" errors={errors?.discount?.message}>
      <Input
        type="number"
        id="discount"
        disabled={isCreating}
        defaultValue={0} {...register("discount", {
        required: 'This field is required',
        validate: (value) => value <= getValues().regularPrice || 'Discount must be between 0 and 100'
      })} />
    </FormRow>

    <FormRow label="Description" errors={errors?.description?.message}>
      <Textarea
        type="number"
        id="description" disabled={isCreating}
        defaultValue="" {...register("description", {required: 'This field is required'})} />
    </FormRow>

    <FormRow label="Cabin Photo">
      <FileInput id="image" disabled={isCreating} accept="image/*" />
    </FormRow>

    <FormRow>
      {/* type is an HTML attribute! */}
      <Button variation="secondary" type="reset">
        Cancel
      </Button>
      <Button disabled={isCreating}>Add cabin</Button>
    </FormRow>
  </Form>);
}

export default CreateCabinForm;
