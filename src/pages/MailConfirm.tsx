import { pb } from "@/lib/pocketbase/db";
import { useParams } from "react-router-dom";

const MailConfirm = () => {
  let { token } = useParams();

  pb.collection("users").confirmVerification("TOKEN");

  console.log(token);
  return (
    <div>
      <div>token</div>
    </div>
  );
};

export default MailConfirm;
