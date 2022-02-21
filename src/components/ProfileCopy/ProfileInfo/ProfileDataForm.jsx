import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import s from "../Profile.module.scss";
import clsx from "clsx";

const ProfileDataForm = ({ profile, onSubmit, messages }) => {
   const validate = yup.object({
      fullName: yup.string().typeError("Должно быть строкой"),
      aboutMe: yup.string().typeError("Должно быть строкой"),
      lookingForAJobDescription: yup.string().typeError("Должно быть строкой"),
   });
   console.log(messages);
   return (
      <Formik
         initialValues={{
            fullName: profile.fullName,
            aboutMe: profile.aboutMe,
            lookingForAJob: profile.lookingForAJob,
            lookingForAJobDescription: profile.lookingForAJobDescription,
         }}
         validateOnBlur
         validationSchema={validate}
         onSubmit={onSubmit}
      >
         {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isValid,
            handleSubmit,
            dirty,
         }) => (
            <Form onSubmit={handleSubmit} className={s.informationWrapper}>
               <div className={s.editButtonWrapper}>
                  <button
                     type="submit"
                     className={clsx(s.saveButton, s.editButton)}
                  >
                     Save
                  </button>
               </div>
               {/* <div>{messages ? <p>{messages}</p> : null}</div> */}
               <div className={s.informationBlock}>
                  <div className={s.informationBlockElement}>
                     <b className={s.desctiption}>Мое полное имя: </b>
                     <Field
                        placeholder="Full Name"
                        name="fullName"
                        component="Input"
                        value={values.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                     />
                  </div>
                  <div className={s.informationBlockElement}>
                     <b className={s.desctiption}>Обо мне: </b>
                     <Field
                        placeholder="About Me"
                        name="aboutMe"
                        component="Input"
                        value={values.aboutMe}
                        onChange={handleChange}
                        onBlur={handleBlur}
                     />
                  </div>
                  <div className={s.informationBlockElement}>
                     <b className={s.desctiption}>Ищу ли я работу? </b>
                     <Field
                        name="lookingForAJob"
                        component="Input"
                        type="checkbox"
                        checked={values.lookingForAJob}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        if={"customCheckBox"}
                        className={s.customCheckBox}
                     />
                     <label for={"customCheckBox"}></label>
                  </div>
                  <div className={s.informationBlockElement}>
                     <b className={s.desctiption}>Что я делаю для этого? </b>
                     <Field
                        placeholder="Looking For A Job Description"
                        name="lookingForAJobDescription"
                        component="Input"
                        onChange={handleChange}
                        onBlur={handleBlur}
                     >
                        {values.lookingForAJobDescription}
                     </Field>
                  </div>
                  <div className={s.contactsBlockElement}>
                     <div>
                        <a href={profile.contacts.vk}>
                           <Field
                              component="Input"
                              value={profile.contacts.vk}
                              name={"contacts.vk"}
                              onChange={handleChange}
                              onBlur={handleBlur}
                           />
                           <box-icon
                              type="logo"
                              name="vk"
                              color={
                                 profile.contacts.vk ? "#61dbfb" : "#5e5c5c"
                              }
                           ></box-icon>
                        </a>
                        <a href={profile.contacts.facebook}>
                           <Field
                              component="Input"
                              value={profile.contacts.facebook}
                              name={"contacts.facebook"}
                              onChange={handleChange}
                              onBlur={handleBlur}
                           />
                           <box-icon
                              type="logo"
                              name="facebook"
                              color={
                                 profile.contacts.facebook
                                    ? "#61dbfb"
                                    : "#5e5c5c"
                              }
                           ></box-icon>
                        </a>
                        <a href={profile.contacts.website}>
                           <Field
                              component="Input"
                              value={profile.contacts.website}
                              name={"contacts.website"}
                              onChange={handleChange}
                              onBlur={handleBlur}
                           />
                           <box-icon
                              name="sitemap"
                              color={
                                 profile.contacts.website
                                    ? "#61dbfb"
                                    : "#5e5c5c"
                              }
                           ></box-icon>
                        </a>
                        <a href={profile.contacts.twitter}>
                           <Field
                              component="Input"
                              value={profile.contacts.twitter}
                              name={"contacts.twitter"}
                              onChange={handleChange}
                              onBlur={handleBlur}
                           />
                           <box-icon
                              name="twitter"
                              type="logo"
                              color={
                                 profile.contacts.twitter
                                    ? "#61dbfb"
                                    : "#5e5c5c"
                              }
                           ></box-icon>
                        </a>
                     </div>
                     <div>
                        <a href={profile.contacts.instagram}>
                           <Field
                              component="Input"
                              value={profile.contacts.instagram}
                              name={"contacts.instagram"}
                              onChange={handleChange}
                              onBlur={handleBlur}
                           />
                           <box-icon
                              name="instagram-alt"
                              type="logo"
                              color={
                                 profile.contacts.instagram
                                    ? "#61dbfb"
                                    : "#5e5c5c"
                              }
                           ></box-icon>
                        </a>
                        <a href={profile.contacts.youtube}>
                           <Field
                              component="Input"
                              value={profile.contacts.youtube}
                              name={"contacts.youtube"}
                              onChange={handleChange}
                              onBlur={handleBlur}
                           />
                           <box-icon
                              name="youtube"
                              type="logo"
                              color={
                                 profile.contacts.youtube
                                    ? "#61dbfb"
                                    : "#5e5c5c"
                              }
                           ></box-icon>
                        </a>
                        <a href={profile.contacts.github}>
                           <Field
                              component="Input"
                              value={profile.contacts.github}
                              name={"contacts.github"}
                              onChange={handleChange}
                              onBlur={handleBlur}
                           />
                           <box-icon
                              name="github"
                              type="logo"
                              color={
                                 profile.contacts.github ? "#61dbfb" : "#5e5c5c"
                              }
                           ></box-icon>
                        </a>
                        <a href={profile.contacts.mainLink}>
                           <Field
                              component="Input"
                              value={profile.contacts.mainLink}
                              name={"contacts.mainLink"}
                              onChange={handleChange}
                              onBlur={handleBlur}
                           />
                           <box-icon
                              name="link"
                              color={
                                 profile.contacts.mainLink
                                    ? "#61dbfb"
                                    : "#5e5c5c"
                              }
                           ></box-icon>
                        </a>
                     </div>
                  </div>
               </div>
            </Form>
         )}
      </Formik>
   );
};

export default ProfileDataForm;
