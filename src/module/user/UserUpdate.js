import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../components/button/Button";
import Radio from "../../components/checkbox/Radio";

import Field from "../../components/field/Field";
import ImageUpload from "../../components/image-upload/ImageUpload";
import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import Toggle from "../../components/toggle/Toggle";
import { db } from "../../firebase-blog/firebase-config";
//role 1 admin 2 user
const UserUpdate = () => {
  const [params] = useSearchParams();
  const id = params.get("id");
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState("");
  const [imageName, setImageName] = useState("");
  const {
    control,
    watch,
    getValues,
    setValue,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      avatar: "",
      email: "",
      fullname: "",
      status: "",
      role: false,
    },
  });
  useEffect(() => {
    const fecthCategory = async () => {
      const colRef = doc(db, "users", id);
      const userData = await getDoc(colRef);
      reset({
        avatar: userData.data().avatar,
        email: userData.data().email,
        fullname: userData.data().fullname,
        status: userData.data().status,
        role: userData.data().role,
      });
      setImageUrl(userData.data().avatar);
    };
    fecthCategory();
  }, [id, reset]);
  const watchRole = watch("role");
  const watchStatus = watch("status");
  const onSubmit = async (values) => {
    const colRef = doc(db, "users", id);
    await updateDoc(colRef, {
      avatar: imageUrl,
      email: values.email,
      fullname: values.fullname,
      status: values.status,
      role: values.role,
    });
    toast.success("Update successfully");
    navigate("/manage/user");
  };
  const handleUploadImage = (file) => {
    if (!file) return;
    const storage = getStorage();
    const storageRef = ref(storage, "avatars/" + file?.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("nothing");
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
          console.log("File available at", downloadURL);
        });
      }
    );
  };
  const onSelectImage = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    setImageName(file.name);
    handleUploadImage(file);
  };
  const deleteImage = () => {
    const storage = getStorage();

    // Create a reference to the file to delete
    const desertRef = ref(storage, "avatar/" + imageName);

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        setImageName("");
        setImageUrl("");
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
      });
  };
  return (
    <div>
      <h1 className="dashboard-heading mb-8">Update User</h1>
      <div className="flex flex-col items-center gap-5">
        <ImageUpload
          onChange={onSelectImage}
          deleteImage={deleteImage}
          image={imageUrl}
          name="avatar"
        ></ImageUpload>
        <h2 className="text-3xl font-medium">{getValues("email")}</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
        <div className="grid grid-cols-3 gap-8">
          <Field>
            <Label name="fullname">Display Name</Label>
            <Input control={control} name="fullname" type="text" />
          </Field>
          <Field>
            <Label name="role">Role</Label>
            <div className="flex flex-row gap-10 mt-4">
              <Radio
                name="role"
                value={1}
                control={control}
                checked={Number(watchRole) === 1}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                value={2}
                control={control}
                checked={Number(watchRole) === 2}
              >
                User
              </Radio>
            </div>
          </Field>
          <Field>
            <Label name="status">Status</Label>
            <Toggle
              checked={watchStatus}
              onClick={() => {
                setValue("status", !watchStatus);
              }}
            >
              Active
            </Toggle>
          </Field>
        </div>
        <div className="w-[300px] mx-auto">
          <Button type="submit">Update</Button>
        </div>
      </form>
    </div>
  );
};

export default UserUpdate;
