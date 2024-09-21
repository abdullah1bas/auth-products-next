/* eslint-disable react/prop-types */
export default function Input({
  id_name,
  placeholder, type, register, value, checked, handleChange, step
}) {
  const isCheckbox = type !== "checkbox";
  const isSelector = id_name === "category";
  return (
    <>
      {isSelector ? (
        <fieldset>
          <label htmlFor={id_name} className="form-label">
            {id_name}
          </label>
          <select
            style={{ height: "40px" }}
            // value={value}
            // type={type}
            id={id_name}
            aria-describedby={placeholder}
            {...register}  // ربط select بـ useForm
            defaultValue="" // تعيين القيمة الافتراضية (إفراغ إذا لم يكن هناك قيمة محددة)
            // placeholder={placeholder}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="men's clothing">men</option>
            <option value="electronics">electronics</option>
            <option value="jewelery">jewelery</option>
            <option value="women's clothing">women</option>
          </select>
        </fieldset>
      ) : isCheckbox ? (
        <fieldset>
          <label htmlFor={id_name}>{placeholder}</label>
          <input
            id={id_name}
            type={type}
            value={value}
            placeholder={placeholder}
            step={step}
            {...register}
            onChange={handleChange}
          />
        </fieldset>
      ) : (
        <fieldset style={{ flexDirection: "row" }}>
          <input
            style={{ width: "initial" }}
            id={id_name}
            type={type}
            checked={checked}
            placeholder={placeholder}
            {...register}
            onChange={handleChange}
          />
          <label htmlFor={id_name}>{placeholder}</label>
        </fieldset>
      )}
    </>
  );
}
