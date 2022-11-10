import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import slugify from "react-slugify";
import Button from "../../components/button/Button";
import Radio from "../../components/checkbox/Radio";
import Field from "../../components/field/Field";
import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase-blog/firebase-config";

const schema = yup.object({
  name: yup.string().required("Please enter your name category"),
});
const CategoryAddNew = () => {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      name: "",
      slug: "",
      status: 1,
    },
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    const errorsList = Object.values(errors);
    if (errorsList.length > 0) {
      toast.error(errorsList[0]?.message);
    }
  }, [errors]);
  const watchStatus = watch("status");
  const addCategory = async (values) => {
    const newValues = { ...values };
    newValues.slug = slugify(newValues.slug || newValues.name);
    console.log(newValues);
    const colRef = collection(db, "categories");
    await addDoc(colRef, {
      ...newValues,
      createdAt: serverTimestamp(),
    });
    reset({ name: "", slug: "", status: 1 });
  };
  return (
    <div>
      <h1 className="dashboard-heading text-primary">ADD NEW CATEGORY</h1>
      <form onSubmit={handleSubmit(addCategory)}>
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <div className="flex flex-wrap gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === 1}
                value={1}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === 2}
                value={2}
              >
                Pending
              </Radio>
            </div>
          </Field>
        </div>
        <Button type="submit" className="mx-auto">
          Add new category
        </Button>
      </form>
    </div>
  );
};

export default CategoryAddNew;
