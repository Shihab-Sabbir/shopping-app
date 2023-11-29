import { App, Button, Form, Input} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../../../../redux/services/auth/authApi';
import { ILoginPayload } from '../../../../redux/services/auth/authApi.interfaces';
import { addUser } from '../../../../redux/features/auth/authSlice';


export default function LoginForm() {
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const {message} = App.useApp();

  const handleSubmit = (values: ILoginPayload) => {
    form.validateFields();
    loginUser(values)
      .unwrap()
      .then(response => {
        if (
          response.statusCode === 200 &&
          response.data.accessToken
        ) {
          addUser(response.data)
          navigate(`/dashboard`);
        }
      }).catch(error => {
        if(error?.status === "FETCH_ERROR"){
          message.error("Login temporarily unavailable due to a server issue. Please try again later.")
        }
      }).finally(() => {
        form.validateFields();
      });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      validateTrigger={['onBlur']}
      size="large"
      onFinish={handleSubmit}
    >
      <Form.Item<ILoginPayload>
        label="Email"
        name="email"
        required
        rules={[
          {
            required: true,
            type: 'email',
            message: 'Email is required',
          },
          {
            warningOnly: true,
            validator: () => {
              if (error && 'data' in error && error.status === 404) {
                return Promise.reject(new Error(error.data.message));
              }
              return Promise.resolve();
            }
          }
        ]}
      >
        <Input
          placeholder="Type your email here..."
          className="rounded-none border-l-4 border-l-primary"
        />
      </Form.Item>
      <Form.Item<ILoginPayload>
        label="Password"
        name="password"
        required
        rules={[
          {
            required: true,
            message: 'Password is required',
          },
          {
            warningOnly: true,
            validator: () => {
              if (error && 'data' in error && error.status !== 404) {
                return Promise.reject(new Error(error.data.message));
              }
              return Promise.resolve();
            }
          }
        ]}
      >
        <Input.Password
          placeholder="Type your password here..."
          className="rounded-none border-l-4 border-l-primary"
        />
      </Form.Item>
      <div className="flex justify-between items-center mb-2">
      
      </div>
      <p className='pb-3'>No account? please <Link to='/signup' className='text-primary'>Sign Up </Link></p>
      <Form.Item<ILoginPayload>>
        <Button
          type="primary"
          block
          loading={isLoading}
          htmlType="submit"
          size="large"
          shape="round"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
