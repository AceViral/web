import { Field, Form, Formik } from "formik";
import { login } from "../../redux/auth-reducer";
import { connect } from "react-redux";
import * as yup from "yup";
import s from "./Login.module.css";
import { Redirect, Route, Switch } from "react-router-dom";

const LoginForm = (props) => {
   const validate = yup.object({
      email: yup.string().typeError("Должно быть строкой").required(),
      password: yup.string().typeError("Должно быть строкой").required(),
   });
   return (
      <Formik
         initialValues={{
            email: "",
            password: "",
            rememberMe: false,
            captcha: "",
         }}
         validateOnBlur
         validationSchema={validate}
         onSubmit={props.onSubmit}
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
            <Form onSubmit={handleSubmit} className={s.box}>
               <h1>login</h1>
               <Field
                  placeholder={"Login"}
                  name={"email"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  className={
                     touched.email && errors.email ? s.error : s.emailPlace
                  }
               />
               <Field
                  placeholder={"Password"}
                  name={"password"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  className={
                     touched.password && errors.password
                        ? s.error
                        : s.passwordPlace
                  }
               />
               <label className={s.checkboxOther} for={"Remember me"}>
                  <Field
                     name={"rememberMe"}
                     component={"input"}
                     type={"checkbox"}
                     checked={values.rememberMe}
                  />
                  <span className={s.rememberMe}>Remember me</span>
               </label>
               <div>
                  {!props.isAuth ? (
                     <p className={s.errorText}>{props.messages}</p>
                  ) : null}
               </div>
               <button type="submit" disabled={!isValid && !dirty}>
                  Login
               </button>
               <Form onSubmit={handleSubmit}>
                  <div>
                     {props.captchaUrl && (
                        <img
                           src={props.captchaUrl}
                           className={s.captchaImg}
                           alt="CAPTCHA"
                        />
                     )}
                  </div>
                  <div>
                     {props.captchaUrl && (
                        <Field
                           placeholder="Symbols from image"
                           name="captcha"
                           type="input"
                           onChange={handleChange}
                           onBlur={handleBlur}
                           className={s.captchaPlace}
                        />
                     )}
                     {touched.captcha && errors.captcha ? (
                        <p className={s.errorText}>{errors.captcha}</p>
                     ) : null}
                  </div>
               </Form>
            </Form>
         )}
      </Formik>
   );
};
const Login = (props) => {
   const onSubmit = (values) => {
      props.login(
         values.email,
         values.password,
         values.rememberMe,
         values.captcha
      );
   };
   return (
      <div className={s.mainForm}>
         <Switch>
            <Route exact path="/" render={() => <Redirect to={"/profile"} />} />
         </Switch>
         <LoginForm
            onSubmit={onSubmit}
            messages={props.messages}
            isAuth={props.isAuth}
            captchaUrl={props.captchaUrl}
         />
      </div>
   );
};

const mapStateToProps = (state) => {
   return {
      messages: state.auth.messages,
      isAuth: state.auth.isAuth,
      captchaUrl: state.auth.captchaUrl,
   };
};

export default connect(mapStateToProps, { login })(Login);
