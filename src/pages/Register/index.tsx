import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./Register.module.css";
import { useAuth } from "../../components/AuthContext";
import { Link } from "react-router-dom";
import avatarImg from "../../assets/user-circle.svg";
import uploadImg from "../../assets/image-upload.svg";
import { useEffect, useState } from "react";
import { useUploadImage } from "../../utils/customHooks/mutations/useUploadImage";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";

const schema = z.object({
  email: z.string().email("כתובת אימייל לא תקינה"),
  password: z.string().min(6, "הסיסמה חייבת להיות באורך של לפחות 6 תווים"),
  firstName: z.string().min(1, "שם פרטי הוא שדה חובה"),
  lastName: z.string().min(1, "שם משפחה הוא שדה חובה"),
  userName: z.string().min(1, "שם משתמש הוא שדה חובה"),
  image: z.instanceof(FileList).refine((obj) => obj.length === 1, {
    message: "תמונה היא שדה חובה",
  }),
});

const Register = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [image] = watch(["image"]);
  const imageRef: { current: HTMLInputElement | null } = { current: null };
  const { ref, ...rest } = register("image", { required: true });

  const { register: registerUser, registerGoogle: registerGoogleUser } =
    useAuth();
  const { mutateAsync: uploadImageMutation } = useUploadImage();

  const onSubmit = async (data) => {
    const image = await uploadImageMutation(data.image[0]);
    await registerUser({ ...data, image });
  };

  useEffect(() => {
    if (image && image[0]) {
      const newUrl = URL.createObjectURL(image[0]);
      if (newUrl !== avatarImg) {
        setPreviewImage(newUrl);
      }
    }
  }, [image]);

  const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
    const { credential = "" } = credentialResponse;
    registerGoogleUser(credential);
  };

  const handleGoogleFailure = () => {
    toast.error("שגיאה בהתחברות עם גוגל");
  };

  return (
    <div className={styles.container}>
      <form
        onSubmit={handleSubmit(onSubmit, (errors) => {
          if (errors?.image?.message) {
            toast.error("נא להוסיף תמונה");
          }
        })}
        className={styles.form}
      >
        <h2 className={styles.title}>הרשמה</h2>
        <>
          <div className={styles.inputGroup}>
            <label htmlFor="email">אימייל</label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className={styles.input}
            />
            {errors.email && <p>{errors.email.message as string}</p>}
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">סיסמה</label>
            <input
              type="password"
              id="password"
              {...register("password")}
              className={styles.input}
            />
            {errors.password && <p>{errors.password.message as string}</p>}
          </div>
          <div className={styles.formRow}>
            <div className={styles.inputGroup}>
              <label htmlFor="firstName">שם פרטי</label>
              <input
                type="text"
                id="firstName"
                {...register("firstName")}
                className={styles.input}
              />
              {errors.firstName && <p>{errors.firstName.message as string}</p>}
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="lastName">שם משפחה</label>
              <input
                type="text"
                id="lastName"
                {...register("lastName")}
                className={styles.input}
              />
              {errors.lastName && <p>{errors.lastName.message as string}</p>}
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="userName">שם משתמש</label>
            <input
              type="text"
              id="userName"
              {...register("userName")}
              className={styles.input}
            />
            {errors.userName && <p>{errors.userName.message as string}</p>}
          </div>
          <div className={styles.formRow}>
            <button type="submit" className={styles.button}>
              הרשמה
            </button>
            <span>
              יש לך כבר חשבון?{" "}
              <span className={styles.link}>
                <Link to="/login">התחברות</Link>
              </span>
            </span>
          </div>
          <hr className={styles.divider} />
          <div className={styles.googleSignup}>הרשמה באמצעות גוגל:</div>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
            auto_select
          />
        </>
      </form>
      <div className={styles.imageContainer}>
        <div
          className={styles.imageUpload}
          onClick={() => imageRef.current?.click()}
        >
          <img src={uploadImg} alt="upload" className={styles.upload} />
          הוספת תמונה
        </div>

        <img
          src={previewImage || avatarImg}
          alt="preview"
          className={styles.image}
        />
        <input
          {...rest}
          ref={(e) => {
            ref(e);
            imageRef.current = e;
          }}
          type="file"
          name="image"
          id="image"
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};

export default Register;
