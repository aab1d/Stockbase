import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = ({ id, value, onChange, className }) => {
  const [visible, setVisible] = useState(false);

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  return (
    <div className="relative">
      <input
        id={id}
        type={visible ? "text" : "password"}
        value={value}
        onChange={onChange}
        className={`${className} w-full pr-10`}
      />
      <button
        type="button"
        onMouseDown={show}
        onMouseUp={hide}
        onMouseLeave={hide}
        onTouchStart={show}
        onTouchEnd={hide}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
        tabIndex={-1}
      >
        {visible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
};

export default PasswordInput;
