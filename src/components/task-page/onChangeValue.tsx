const onChangeValue = (e: React.FormEvent<HTMLInputElement>,
  setFunc: React.Dispatch<React.SetStateAction<string>>) => {
  setFunc(e.currentTarget.value);
};

export default onChangeValue;
