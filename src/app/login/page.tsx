import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LoginPage = () => {
  return (
    <div>
      <form className="max-w-96 flex flex-col">
        <Input placeholder="Username" />
        <Input type="passowrd" placeholder="Password" />
        <Button>Login</Button>
      </form>
    </div>
  );
};

export default LoginPage;
