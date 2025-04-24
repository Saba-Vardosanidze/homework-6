import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  lastName: z.string().min(1, "Use only letters."),
  userName: z.string().min(1, "Use only letters."),
  email: z.string().min(3, "use '@' this"),
  number: z.coerce.number().min(3, "Use only numbers."),
  message: z.union([z.string().min(1, "Do not leave blank."), z.number()]),
});

const Registration = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const handleForm = async (data) => {
    fetch("https://6807cb21942707d722dc723c.mockapi.io/feedBack", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to Sand Feedback");
        }
        return res.json();
      })
      .then((responseData) => {
        console.log(responseData);
        reset();
      });
  };
  return (
    <div className="flex lg:flex-row justify-center lg:justify-between items-center bg-[#FFFFFF04] m-auto mt-[154px] rounded-[20px] lg:max-w-[1092px] min-h-[576px]">
      <div className="ml-[60px]">
        <div className="max-w-[415px]">
          <h2 className="font-semibold text-[#FFFFFF] text-[30px]">
            Let’s connect constellations
          </h2>
          <p className="text-[#FFFFFF95]">
            Let's align our constellations! Reach out and let the magic of
            collaboration illuminate our skies.
          </p>
        </div>
        <form
          className="flex flex-col gap-[14px] mt-[41px]"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <div className="flex sm:flex-row flex-col gap-[14px]">
            <div>
              <input
                type="text"
                placeholder="Last Name"
                className={`bg-[#FFFFFF05] border-[#FFFFFF20] pr-[14px] pl-[14px] border rounded-[5px] w-full max-w-[206px] focus:outline-none  min-h-[42px] text-[#FFFFFF60] transition-colors duration-300 ${
                  errors.lastName
                    ? "border-red-500"
                    : " focus:border-[#763AF580]"
                }`}
                {...register("lastName")}
              />
              <p className="ml-[6px] text-[12px] text-red-700 italic">
                {errors.lastName && errors.lastName.message}
              </p>
            </div>
            <div>
              <input
                className={`bg-[#FFFFFF05] border-[#FFFFFF20] pr-[14px] pl-[14px] border rounded-[5px] w-full max-w-[206px] focus:outline-none  min-h-[42px] text-[#FFFFFF60] transition-colors duration-300 ${
                  errors.userName
                    ? "border-red-500"
                    : " focus:border-[#763AF580]"
                }`}
                type="text"
                placeholder="First Name"
                {...register("userName")}
              />
              <p className="ml-[6px] text-[12px] text-red-700 italic">
                {errors.userName && errors.userName.message}
              </p>
            </div>
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              className={`bg-[#FFFFFF05] border-[#FFFFFF20] pr-[14px] pl-[14px] border rounded-[5px] w-full max-w-[426px] focus:outline-none  min-h-[42px] text-[#FFFFFF60] transition-colors duration-300 ${
                errors.email ? "border-red-500" : " focus:border-[#763AF580]"
              }`}
              {...register("email")}
            />
            <p className="ml-[6px] text-[12px] text-red-700 italic">
              {errors.email && errors.email.message}
            </p>
          </div>
          <div>
            <input
              type="text"
              placeholder="Phone Number"
              className={`bg-[#FFFFFF05] border-[#FFFFFF20] pr-[14px] pl-[14px] border rounded-[5px] w-full max-w-[426px] focus:outline-none  min-h-[42px] text-[#FFFFFF60] transition-colors duration-300 ${
                errors.number ? "border-red-500" : " focus:border-[#763AF580]"
              }`}
              {...register("number")}
            />
            <p className="ml-[6px] text-[12px] text-red-700 italic">
              {errors.number && errors.number.message}
            </p>
          </div>
          <div>
            <textarea
              type="text"
              placeholder="Message"
              className={`bg-[#FFFFFF05] border-[#FFFFFF20] pr-[14px] pl-[14px] border rounded-[5px] w-full max-w-[426px] focus:outline-none  min-h-[109px] text-[#FFFFFF60] transition-colors duration-300 ${
                errors.message ? "border-red-500" : " focus:border-[#763AF580]"
              }`}
              {...register("message")}
            />
            <p className="ml-[6px] text-[12px] text-red-700 italic">
              {errors.message && errors.message.message}
            </p>
          </div>

          <button
            type="submit"
            className="rounded-[5px] max-w-[426px] min-h-[42px] text-[#FFFFFF] cursor-pointer sendingButton"
          >
            {isSubmitting ? "Sending..." : "Send it to the moon"}
          </button>
        </form>
      </div>
      <div className="hidden relative lg:flex mt-[20px] lg:mt-0 lg:mr-[20px]">
        <img src="./images/png/astronalt.png" alt="astronalt" />
        <p className="bottom-[73px] left-[28px] absolute max-w-[466px] text-[#FFFFFF90]">
          “Two lunar months revealed Earth's fragile beauty against vast
          silence, transforming my view of our place in the universe.
        </p>
        <p className="bottom-[48px] left-[28px] absolute text-[#FFFFFF]">
          Irinel Traista
        </p>
      </div>
    </div>
  );
};

export default Registration;
