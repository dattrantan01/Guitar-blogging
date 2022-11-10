import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "react-slugify";
import styled from "styled-components";
import { postStatus } from "../../utils/constants";
import Button from "../../components/button/Button";
import Radio from "../../components/checkbox/Radio";
import Dropdown from "../../components/dropdown/Dropdown";
import Field from "../../components/field/Field";
import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import { db } from "../../firebase-blog/firebase-config";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import Toggle from "../../components/toggle/Toggle";
import Option from "../../components/dropdown/Option";
import Select from "../../components/dropdown/Select";
import List from "../../components/dropdown/List";
import { useAuth } from "../../contexts/auth-context";
import { toast } from "react-toastify";
import ImageUpload from "../../components/image-upload/ImageUpload";
const PostAddNewStyles = styled.div``;

const PostAddNew = () => {
  const { control, watch, setValue, handleSubmit, getValues, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: "",
      category: "",
      hot: false,
    },
  });
  const { userInfo } = useAuth();
  const [selectCategory, setSelectCatergory] = useState();
  const [categories, setCategories] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [imageName, setImageName] = useState("");
  const watchHot = watch("hot");
  const watchStatus = watch("status");
  useEffect(() => {
    async function getData() {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", 1));
      const querySnapshot = await getDocs(q);
      let result = [];
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories(result);
    }
    getData();
  }, []);

  const addPostHandler = async (values) => {
    values.slug = slugify(values.slug || values.title);

    const colRef = collection(db, "posts");
    await addDoc(colRef, {
      title: values.title,
      slug: values.slug,
      hot: values.hot,
      status: values.status,
      category: values.category,
      image: imageUrl,
      userId: userInfo.uid,
      createdAt: serverTimestamp(),
    });
    toast.success("success");
    reset({
      title: "",
      slug: "",
      status: "",
      category: "",
      hot: false,
    });
    setImageUrl("");
    setSelectCatergory(null);
  };
  const handleUploadImage = (file) => {
    if (!file) return;
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + file?.name);
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
    const desertRef = ref(storage, "images/" + imageName);

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
  const handleClickOption = (item) => {
    setValue("category", item.id);
    setSelectCatergory(item);
  };
  return (
    <PostAddNewStyles>
      <h1 className="dashboard-heading text-primary">Add new post</h1>
      <form onSubmit={handleSubmit(addPostHandler)}>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>

        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Image</Label>
            <ImageUpload
              name="image"
              image={imageUrl}
              onChange={onSelectImage}
              deleteImage={deleteImage}
            ></ImageUpload>
          </Field>
          <Field>
            <Label>Status</Label>
            <div className="flex items-center gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.APPROVED}
                value={1}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.PENDING}
                value={2}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.REJECTED}
                value={3}
              >
                Reject
              </Radio>
            </div>
          </Field>
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Select
                placeholder={`${selectCategory?.name || "Category"}`}
              ></Select>
              <List>
                {categories.length > 0 &&
                  categories.map((item) => {
                    return (
                      <Option
                        key={item.id}
                        onClick={() => handleClickOption(item)}
                      >
                        {item.name}
                      </Option>
                    );
                  })}
              </List>
            </Dropdown>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Feature Post</Label>
            <Toggle
              checked={watchHot === true}
              onClick={() => {
                setValue("hot", !watchHot);
              }}
            ></Toggle>
          </Field>
          <Field></Field>
        </div>
        <Button type="submit" className="mx-auto">
          Add new post
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNew;
