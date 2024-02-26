import { useAtom } from "jotai";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { loginComponentAtom } from "@/lib/jotai/store";

const Confirm = () => {
  const [_, setLoginComponent] = useAtom(loginComponentAtom);

  return (
    <div>
      <Card className="max-w-[450px] mt-12 mx-auto">
        <CardContent className="p-4">
          <div>🎉가입하신 것을 환영합니다!🎉</div>
          <p className="mt-4">
            🎈<span className="text-primary">메일 인증 후</span> 로그인 해
            주세요.🎈
          </p>
          <Button
            variant={"default"}
            className="mt-4"
            onClick={() => {
              setLoginComponent("signin");
            }}
          >
            로그인하러가기
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Confirm;
