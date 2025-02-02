import VerificationCode from "../models/verificationCodeModel.js";

const consumeCode = async ({ emailAddress = "", vCode = "" }) => {
  if (emailAddress && vCode) throw new Error("Only 1 parameter can be used");

  let res;

  if (emailAddress) {
    res = await VerificationCode.deleteMany({
      emailAddress: emailAddress,
    });
  }

  if (vCode) {
    res = await VerificationCode.deleteOne({
      verificationCode: vCode,
    });
  }

  if (res || res.deletedCount) return;
  else throw new Error("Failed to consume Verification code");
};

export { consumeCode };
