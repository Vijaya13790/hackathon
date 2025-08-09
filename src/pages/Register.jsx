import { ErrorMessage, Field, Form, Formik } from "formik"
import * as yup from 'yup'
import API_URL from '../services/endpoint'
import { postApi } from "../services/service"
import Header from "../component/Header"
import { Link } from "react-router-dom"

const Register = () => {

    const initialValues = {
        name: '',
        email: '',
        password: '',
        usertype: false
    }



    const validationSchema = yup.object().shape({
        name: yup.string().min(3, "min 3").required("require"), // Name: at least 3 chars, required
        email: yup.string().email("invalid email").required("require"), // Email: must be valid, required
        password: yup.string().min(6, "min 6").required("require"), // Password: at least 6 chars, required
         usertype:yup.string().oneOf(['buyer', 'seller'],'select user type').required('required'),
    })


    const handlesubmit = async (values) => {
        console.log(values);

        const data = {
            "name": values.name,
            "email": values.email,
            'password': values.password,
            'userType': values.usertype
        }
        console.log(data, "data");

        try {
            const post = await postApi(API_URL.REGISTER, data)
            
            if (!post.ok) {
                throw error
            }else{
                 initialValues.name = '',
        initialValues.email= '',
        initialValues.password= '',
        initialValues.usertype= false
            }
        } catch (error) {
            alert(error && error)
            console.log(error, "error")
        }
    }

    return (<>
        <Header />

        <div className="authBox">
            <h1 className="text-center">Register</h1>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handlesubmit}>
                {() => <Form>
                        <div className="d-flex ">
                            <label htmlFor="name">Name</label>
                            <Field type="text" name="name" />
                            <p className="error text-left mt-0"><ErrorMessage name="name" /></p>
                        </div>

                        <div className="d-flex ">
                            <label htmlFor="email">Email</label>
                            <Field type="email" name="email" />
                            <p className="error text-left mt-0"><ErrorMessage name="email" /></p>
                        </div>
                        <div className="d-flex ">
                            <label htmlFor="name">Password</label>
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
                }
            </Formik>
            <Link to="/login">Already Registered?</Link>


        </div>
    </>)
}

export default Register