import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { useState, useRef } from "react";

import { styles } from "../sytle";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

import { VerifaliaRestClient } from "verifalia";

const Contact = () => {
  const formRef = useRef();

  // const username = String(import.meta.env.username);
  // const password = String(import.meta.env.password);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const verifalia = new VerifaliaRestClient({
    username: "fa46e222f3704c52a2bda9fcc2a77e1d",
    password: "6Ev@vxKMQEuCF8M",
  });

  const verifyEmail = async () => {
    if (validateEmail(form.email)) {
      const result = await verifalia.emailValidations.submit(form.email);

      // At this point the address has been validated: let's print
      // its email validation result to the console.

      const entry = result.entries[0];
      const newResult = entry.classification;

      if (newResult === "Undeliverable") {
        alert("Invalid email id.");
        setLoading(false);
      } else {
        // template_6nzah2e
        // service_groowwp
        // E-ItbHBLxbgUrpxN6
        emailjs
          .send(
            "service_groowwp",
            "template_6nzah2e",
            {
              from_name: form.name,
              to_name: "Aditya",
              from_email: form.email,
              to_email: "adi.borse111@gmail.com",
              message: form.message,
            },
            "E-ItbHBLxbgUrpxN6"
          )
          .then(
            () => {
              setLoading(false);
              alert("The message has been sent.");

              setForm({
                name: "",
                email: "",
                message: "",
              });
            },
            (error) => {
              setLoading(false);
              console.log(error);
              alert("Something went wrong.");
            }
          );
      }

      console.log(`${entry.classification}`);

      // Prints out something like:
      // Deliverable (Success)
    } else {
      alert("invalid email");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    verifyEmail();
  };

  return (
    <div className="xl:mt-12 xl:flex-row flex flex-col-reverse gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your message</span>
            <textarea
              rows="7"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What do you want to say?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>
          <button
            type="submit"
            className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
