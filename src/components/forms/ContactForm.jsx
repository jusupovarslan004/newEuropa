import { useState } from "react";
import TextField from "../common/TextField";
import "./ContactForm.scss";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    message: "",
    name: "",
    password: "",
    email: "",
  });

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  return (
    <form className="contact-form">
      <TextField
        label="Ваше сообщение"
        multiline
        value={formData.message}
        onChange={handleChange("message")}
        placeholder="Введите ваше сообщение для нас"
      />

      <TextField
        label="Имя"
        value={formData.name}
        onChange={handleChange("name")}
        placeholder="Введите ваше имя"
      />

      <TextField
        label="Пароль"
        type="password"
        value={formData.password}
        onChange={handleChange("password")}
        placeholder="Введите пароль"
      />

      <TextField
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleChange("email")}
        placeholder="Введите email"
      />

      <button type="submit" className="button button--primary">
        Отправить
      </button>
    </form>
  );
};

export default ContactForm;
