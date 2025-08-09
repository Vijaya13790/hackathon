import { ErrorMessage, Field, Form, Formik } from "formik"
import * as yup from 'yup'
import API_URL from '../services/endpoint'
import { postApi } from "../services/service"
import Header from "../component/Header"
import { Link } from "react-router-dom"

const Login = () => {
    const initialValues = {
        name: '',
        password: '',
        usertype: false
    }

    const validationSchema = yup.object().shape({
        password: yup.string().required('require'),
        usertype:yup.string().oneOf(['buyer', 'seller'],'select gender').required('required'),
        email: yup.string().email("invalid email").required("require"), // Email: must be valid, required
    })

    const handlesubmit = async (values) => {
        console.log(values);

        localStorage.setItem("type", values.usertype)


        const data = {
            "password": values.password,
            'email': values.email,
            "userType": values.usertype
        }
        console.log(data, "data");

        try {
            const post = await postApi(API_URL.LOGIN, data)
            if (!post.ok) {
                throw error
            }
        } catch (error) {
            alert("login failed")
            console.log(error, "error")
        }
    }

    return (<>
        <Header />

        <div className="authBox">
            <h1 className="text-center"> login</h1>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handlesubmit}>
                {() => {
                    return <Form>
                         <div className="d-flex">
                            <label htmlFor="email">email</label>
                            <Field type="email" name="email" />
                            <p className="error text-left mt-0"><ErrorMessage name="email" /></p>
                        </div>

                        <div className="d-flex">
                            <label htmlFor="password">Password</label>
                            <Field type="password" name="password" />
                            <p className="error text-left mt-0"><ErrorMessage name="password" /></p>
                        </div>

                        <div className="d-flex ">
                            <label htmlFor="usertype">User Type</label>
                            <div className="usertype">
                                  <label><Field type="radio" name="usertype" value="buyer" />buyer</label>
                                  <label><Field type="radio" name="usertype" value="seller" />seller</label>
                                <p className="error text-left mt-0"><ErrorMessage name="usertype" /></p>
                            </div>

                        </div>

                        <button type="submit">submit</button>
                    </Form>
                }}
            </Formik>
            <Link to="/register">Not Register?</Link>
        </div>
    </>)
}

export default Login