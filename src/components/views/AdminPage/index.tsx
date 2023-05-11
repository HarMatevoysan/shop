import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { noImg } from "../../../asests";
import { ILogin } from "../../../types/products";
import { useTypedSelector } from "../../../hooks";
import { ProductTypes } from "../../../store/actionTypes";

import style from "./AdminPage.module.scss";

const AdminPanel: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const state = useTypedSelector((state) => state.shop);

  const [users, setUsers] = useState<boolean>(false);
  const [newProduct, setNewProduct] = useState<boolean>(false);
  const [newCategory, setNewCategory] = useState<boolean>(false);

  const [desc, setDesc] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [price, setPrice] = useState<number>();
  const [img, setImg] = useState<string>(noImg);
  const [categoryNew, setCategoryNew] = useState<string>();
  const [categoryValue, setCategoryValue] = useState<string>();

  useEffect(() => {
    if (!localStorage?.admin) {
      navigate("/");
    }
  }, [localStorage.admin]);

  const setProduct = () => {
    setNewProduct(!newProduct);
    setNewCategory(false);
    setUsers(false);
  };

  const setCategory = () => {
    setNewProduct(false);
    setNewCategory(!newCategory);
    setUsers(false);
  };

  const setUser = () => {
    setNewProduct(false);
    setNewCategory(false);
    setUsers(!users);
  };

  const handleRemoveUser = (id: number) => {
    dispatch({ type: ProductTypes.REMOVE_USER, payload: id });
  };

  const addImg = (files: FileList | null) => {
    if (files) {
      const fileRef = files[0] || "";
      const fileType: string = fileRef.type || "";
      const reader = new FileReader();
      reader.readAsBinaryString(fileRef);
      reader.onload = (ev: any) => {
        setImg(`data:${fileType};base64,${btoa(ev.target.result)}`);
      };
    }
  };

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    addImg(e.target.files);
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseInt(e.target.value));
  };

  const handleChangeDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value);
  };

  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryValue(e.target.value);
  };

  const handleChangeCategoryNew = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryNew(e.target.value);
  };

  const handleAddProduct = () => {
    dispatch({ type: ProductTypes.ADD_PRODUCT, payload: [title, price, desc, img, categoryValue] });
    alert("A new item has been added to your items");
    navigate("/");
  };

  const handleAddCategory = () => {
    dispatch({ type: ProductTypes.ADD_CATEGORY, payload: categoryNew });
    alert("Category added");
    setCategoryNew("");
    setNewCategory(false);
  };
  return (
    <div className={style.content}>
      <div className={style.content__btns}>
        <button className={style.content__btns_btn} onClick={setProduct}>
          Add new product
        </button>
        <button className={style.content__btns_btn} onClick={setCategory}>
          Add new category
        </button>
        <button className={style.content__btns_btn} onClick={setUser}>
          Users
        </button>
      </div>
      {newProduct || newCategory || users ? (
        <div className={style.content__body}>
          {newProduct ? (
            <div className={style.content__body_new}>
              <label className={style.content__body_new_img}>
                <img src={img ? img : noImg} />
                <input type="file" accept="image/*" onChange={handleChangeImg} />
              </label>
              <div className={style.content__body_new_inputs}>
                <input type="text" value={title} placeholder="Product title" onChange={handleChangeTitle} />
                <input type="number" value={price} placeholder="Product price" onChange={handleChangePrice} />
                <input type="text" value={desc} placeholder="Product description" onChange={handleChangeDesc} />
                <select onChange={handleChangeCategory} value={categoryValue}>
                  <option defaultChecked>Select category</option>
                  {state.category.map((value) => (
                    <option>{value}</option>
                  ))}
                </select>
                <button onClick={handleAddProduct}>Add product</button>
              </div>
            </div>
          ) : null}
          {newCategory ? (
            <div className={style.content__body_category}>
              <input
                type="text"
                value={categoryNew}
                placeholder="Input new category"
                onChange={handleChangeCategoryNew}
              />
              <button onClick={handleAddCategory}>Add category</button>
            </div>
          ) : null}
          {users ? (
            <>
              {state.login.map((user: ILogin) => (
                <div className={style.content__body_user}>
                  <div className={style.content__body_user_name}>
                    User by username: <span>{user.username}</span>
                  </div>
                  <button
                    className={style.content__body_user_btn}
                    disabled={user.username === "admin" ? true : false}
                    onClick={() => handleRemoveUser(user.id)}
                  >
                    Delete user
                  </button>
                </div>
              ))}
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default AdminPanel;
