import "react-phone-input-2/lib/style.css";
import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import { useEffect, useState } from "react";

export default function Form({
  register,
  errors,
  control,
  setError,
  clearErrors,
}) {
  const [validNumber, setValidNumber] = useState(true);

  useEffect(() => {
    if (!validNumber) {
      setError("phone", {
        type: "manual",
        message: "Invalid phone number",
      });
    } else {
      clearErrors("phone");
    }
  }, [validNumber, setError, clearErrors]);

  function validatePhoneNumber(value) {
    const minLength = 10; // min length of the phone number
    const maxLength = 15; // max length of the phone number
    const cleanedValue = value.replace(/\D/g, ""); // remove all non-numeric characters

    return cleanedValue.length >= minLength && cleanedValue.length <= maxLength;
  }

  return (
    <form className="grid gap-5">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="relative">
          <Input
            type="text"
            className={
              errors.username
                ? "border-red-500 outline-red-500"
                : "outline-primary"
            }
            {...register("username")}
            placeholder="Name"
          />
          <p className="text-red-500 absolute left-0 text-[10px] -bottom-4 leading-[1.2]">
            {errors.username?.message}
          </p>
        </div>
        <div className="relative">
          <Input
            type="email"
            className={
              errors.username
                ? "border-red-500 outline-red-500"
                : "outline-primary"
            }
            {...register("email")}
            placeholder="Email"
          />
          <p className="text-red-500 absolute left-0 text-[10px] -bottom-4 leading-[1.2]">
            {errors.email?.message}
          </p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-10">
        <div className="relative">
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            rules={{ required: "Phone number is required" }}
            render={({ field: { onChange, value } }) => (
              <PhoneInput
                placeholder="Phone"
                country={"ua"}
                preferredCountries={["us", "ua"]}
                enableSearch={true}
                value={value}
                onChange={(value) => {
                  const isValid = validatePhoneNumber(value);
                  setValidNumber(isValid);
                  onChange(value);
                }}
                isValid={() => validNumber}
                inputStyle={{
                  width: "100%",
                  height: "40px",
                  padding: "10px",
                  paddingLeft: "42px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
                inputComponent={({ ...inputProps }) => (
                  <Input
                    {...inputProps}
                    className={
                      errors.phone
                        ? "border-red-500 outline-red-500"
                        : "outline-primary"
                    }
                  />
                )}
              />
            )}
          />
          <p className="text-red-500 absolute left-0 text-[10px] -bottom-4 leading-[1.2]">
            {errors.phone?.message}
          </p>
        </div>
        <div className="relative">
          <Input
            type="number"
            className={
              errors.username
                ? "border-red-500 outline-red-500"
                : "outline-primary"
            }
            {...register("zip")}
            placeholder="Zip"
          />
          <p className="text-red-500 absolute left-0 text-[10px] -bottom-4 leading-[1.2]">
            {errors.zip?.message}
          </p>
        </div>
      </div>
      <div className="relative">
        <Input
          type="text"
          className={
            errors.username
              ? "border-red-500 outline-red-500"
              : "outline-primary"
          }
          {...register("address")}
          placeholder="Address"
        />
        <p className="text-red-500 absolute left-0 text-[10px] -bottom-4 leading-[1.2]">
          {errors.address?.message}
        </p>
      </div>
    </form>
  );
}
