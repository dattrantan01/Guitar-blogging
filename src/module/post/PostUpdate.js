import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
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
import slugify from "react-slugify";
import { toast } from "react-toastify";
import Button from "../../components/button/Button";
import Radio from "../../components/checkbox/Radio";
import Dropdown from "../../components/dropdown/Dropdown";
import List from "../../components/dropdown/List";
import Option from "../../components/dropdown/Option";
import Select from "../../components/dropdown/Select";
import Field from "../../components/field/Field";
import ImageUpload from "../../components/image-upload/ImageUpload";
import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import Toggle from "../../components/toggle/Toggle";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { db } from "../../firebase-blog/firebase-config";
import { postStatus } from "../../utils/constants";

const PostUpdate = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const id = params.get("id");
  const { control, watch, setValue, handleSubmit, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: "",
      category: "",
      hot: false,
    },
  });
  const [prevPost, setPrevPost] = useState({});
  const [selectCategory, setSelectCategory] = useState();
  const [categories, setCategories] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [imageName, setImageName] = useState("");
  const watchHot = watch("hot");
  const watchStatus = watch("status");
  const [content, setContent] = useState("");
  console.log("content", content);
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
    const fecthPost = async () => {
      const colRef = doc(db, "posts", id);
      const postData = await getDoc(colRef);

      reset({
        title: postData.data().title,
        slug: postData.data().slug,
        status: postData.data().status,
        category: postData.data().category.id,
        hot: postData.data().hot,
      });
      setPrevPost(postData.data());
      setImageName(postData.data().imageName);
      setImageUrl(postData.data().image);
      setSelectCategory(postData.data().category);
      setContent(postData.data().content);
    };
    fecthPost();
    getData();
  }, [id, reset, setPrevPost]);
  console.log(content);
  const updatePostHandler = async (values) => {
    values.slug = slugify(values.slug || values.title);

    const colRef = doc(db, "posts", id);
    await updateDoc(colRef, {
      ...prevPost,
      title: values.title,
      slug: values.slug,
      hot: values.hot,
      status: values.status,
      category: { id: values.category, name: selectCategory?.name },
      image: imageUrl,
      content: content,
    });
    toast.success("success");

    navigate("/manage/post");
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
    setSelectCategory(item);
  };
  return (
    <div>
      <h1 className="dashboard-heading text-primary">Update post</h1>
      <form onSubmit={handleSubmit(updatePostHandler)}>
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
        <div className="flex flex-col gap-5 mb-10">
          <Label>Content</Label>
          <ReactQuill theme="snow" value={content} onChange={setContent} />
        </div>

        <Button type="submit" className="mx-auto">
          Update post
        </Button>
      </form>
    </div>
  );
};

export default PostUpdate;
